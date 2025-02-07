import MailIcon from "@mui/icons-material/Mail";
import HistoryIcon from "@mui/icons-material/History";

const mails = {
	id: "group-orders",
	title: "E-Mails",
	type: "group",
	children: [
		{
			id: "accueil",
			title: "Accueil",
			type: "item",
			url: "/",
			icon: MailIcon,
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
	],
};

export default mails;
