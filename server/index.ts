import path from "path";
require("dotenv").config();
import { createRequestHandler } from "@remix-run/express";
import compression from "compression";
import express, { RequestHandler } from "express";
import morgan from "morgan";

import { createUsersByIdLoader } from "~/loaders/userLoader";
import {
  broadcastDevReady,
  installGlobals,
  ServerBuild,
} from "@remix-run/node";
import * as fs from "fs";
import * as url from "url";

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "build/index.js");
const BUILD_VERSION = path.join(process.cwd(), "build/version.txt");
const app = express();

import sourceMapSupport from "source-map-support";

sourceMapSupport.install();
installGlobals();
run();
async function run() {
  const initialBuild = await reimportServer();

  app.use(compression());

  // You may want to be more aggressive with this caching
  app.use(express.static("public", { maxAge: "1h" }));

  // Remix fingerprints its assets so we can cache forever
  app.use(express.static("public/build", { immutable: true, maxAge: "1y" }));

  app.use(morgan("tiny"));
  app.all("*", async (...args) => {
    const handler =
      process.env.NODE_ENV !== "production"
        ? await createDevRequestHandler(initialBuild, () => ({
            loaders: {
              usersById: createUsersByIdLoader(),
            },
          }))
        : createRequestHandler({
            build: initialBuild,
            mode: initialBuild.mode,
          });

    return handler(...args);
  });

  const port = process.env.PORT || 8002;
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
    if (process.env.NODE_ENV === "development") {
      broadcastDevReady(initialBuild);
    }
  });

  ////////////////////////////////////////////////////////////////////////////////
  function purgeRequireCache() {
    // purge require cache on requests for "server side HMR" this won't let
    // you have in-memory objects between requests in development,
    // alternatively you can set up nodemon/pm2-dev to restart the server on
    // file changes, we prefer the DX of this though, so we've included it
    // for you by default
    for (const key in require.cache) {
      if (key.startsWith(BUILD_DIR)) {
        delete require.cache[key];
      }
    }
  }

  async function reimportServer(): Promise<ServerBuild> {
    // cjs: manually remove the server build from the require cache
    Object.keys(require.cache).forEach((key) => {
      if (key.startsWith(BUILD_DIR)) {
        delete require.cache[key];
      }
    });

    const stat = fs.statSync(BUILD_DIR);

    // convert build path to URL for Windows compatibility with dynamic `import`
    const BUILD_URL = url.pathToFileURL(BUILD_DIR).href;

    // use a timestamp query parameter to bust the import cache
    return import(BUILD_URL + "?t=" + stat.mtimeMs);
  }

  async function createDevRequestHandler(
    initialBuild: ServerBuild,
    getLoadContext: any,
  ): Promise<RequestHandler> {
    let build = initialBuild;
    async function handleServerUpdate() {
      // 1. re-import the server build
      build = await reimportServer();
      // 2. tell Remix that this app server is now up-to-date and ready
      await broadcastDevReady(build);
    }
    const chokidar = await import("chokidar");
    chokidar
      .watch(BUILD_VERSION, { ignoreInitial: true })
      .on("add", handleServerUpdate)
      .on("change", handleServerUpdate);

    // wrap request handler to make sure its recreated with the latest build for every request
    return async (req, res, next) => {
      try {
        return createRequestHandler({
          build,
          mode: "development",
          getLoadContext,
        })(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }
}
