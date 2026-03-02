import MailIcon from "@mui/icons-material/Mail";
import HistoryIcon from "@mui/icons-material/History";
import BarChartIcon from "@mui/icons-material/BarChart";
import ScienceIcon from "@mui/icons-material/Science";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";

const mails = {
	id: "group-orders",
	title: "E-Mails",
	type: "group",
	children: [
		{
			id: "accueil",
			title: "Tableau de Bord",
			type: "item",
			url: "/",
			icon: DashboardIcon,
			breadcrumbs: false,
		},
		{
			id: "nouvelle-campagne",
			title: "Nouvelle Campagne",
			type: "item",
			url: "/nouvelle-campagne",
			icon: AddBoxIcon,
			breadcrumbs: false,
		},
		{
			id: "history",
			title: "Historique",
			type: "item",
			url: "/historique",
			icon: HistoryIcon,
			breadcrumbs: false,
		},
		{
			id: "statistics",
			title: "Statistiques",
			type: "item",
			url: "/statistiques",
			icon: BarChartIcon,
			breadcrumbs: false,
		},
		{
			id: "tests",
			title: "Tests de mails",
			type: "item",
			url: "/test-mails",
			icon: ScienceIcon,
			breadcrumbs: false,
		}
	],
};

export default mails;
