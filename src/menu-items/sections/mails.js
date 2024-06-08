import MailIcon from "@mui/icons-material/Mail";

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
	],
};

export default mails;
