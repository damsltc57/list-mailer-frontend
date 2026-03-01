import { lazy } from "react";

import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";

const HomePage = Loadable(lazy(() => import("pages/Home")));
const ContactListPage = Loadable(lazy(() => import("pages/ContactList")));
const OAuthCallback = Loadable(lazy(() => import("pages/OAuthCallback")));
const HistoryPage = Loadable(lazy(() => import("pages/History")));
const StatisticsPage = Loadable(lazy(() => import("pages/Statistics")));
const TestMailHistoryPage = Loadable(lazy(() => import("pages/TestMailHistory")));
const TestMailNewPage = Loadable(lazy(() => import("pages/TestMailNew")));

const MainRoutes = {
	path: "/",
	element: <MainLayout authenticated={true} />,
	children: [
		{ path: "/", index: true, element: <HomePage /> },
		{ path: "/contacts", index: true, element: <ContactListPage /> },
		{ path: "/oauth2callback", index: true, element: <OAuthCallback /> },
		{ path: "/historique", index: true, element: <HistoryPage /> },
		{ path: "/statistiques", index: true, element: <StatisticsPage /> },
		{ path: "/test-mails", index: true, element: <TestMailHistoryPage /> },
		{ path: "/test-mails/new", index: true, element: <TestMailNewPage /> },
	],
};

export default MainRoutes;
