import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";

// render - dashboard
const HomePage = Loadable(lazy(() => import("pages/Home")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: "/",
	element: <MainLayout authenticated={true} />,
	children: [{ path: "/", index: true, element: <HomePage /> }],
};

export default MainRoutes;
