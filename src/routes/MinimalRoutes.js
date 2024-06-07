import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import MinimalLayout from "layout/MinimalLayout";

// ==============================|| AUTH ROUTING ||============================== //

const MinimalRoutes = {
	path: "/",
	element: <MinimalLayout authenticated={true} />,
	children: [],
};

export default MinimalRoutes;
