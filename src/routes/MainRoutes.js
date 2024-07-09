import { lazy } from "react";

import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";

const HomePage = Loadable(lazy(() => import("pages/Home")));
const ContactListPage = Loadable(lazy(() => import("pages/ContactList")));
const OAuthCallback = Loadable(lazy(() => import("pages/OAuthCallback")));

const MainRoutes = {
	path: "/",
	element: <MainLayout authenticated={true} />,
	children: [
		{ path: "/", index: true, element: <HomePage /> },
		{ path: "/contacts", index: true, element: <ContactListPage /> },
		{ path: "/oauth2callback", index: true, element: <OAuthCallback /> },
	],
};

export default MainRoutes;
