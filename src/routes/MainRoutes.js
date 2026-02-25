import { lazy } from "react";

import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";

const HomePage = Loadable(lazy(() => import("pages/Home")));
const ContactListPage = Loadable(lazy(() => import("pages/ContactList")));
const OAuthCallback = Loadable(lazy(() => import("pages/OAuthCallback")));
const HistoryPage = Loadable(lazy(() => import("pages/History")));
const StatisticsPage = Loadable(lazy(() => import("pages/Statistics")));

const MainRoutes = {
	path: "/",
	element: <MainLayout authenticated={true} />,
	children: [
		{ path: "/", index: true, element: <HomePage /> },
		{ path: "/contacts", index: true, element: <ContactListPage /> },
		{ path: "/oauth2callback", index: true, element: <OAuthCallback /> },
		{ path: "/historique", index: true, element: <HistoryPage /> },
		{ path: "/statistiques", index: true, element: <StatisticsPage /> },
	],
};

export default MainRoutes;
