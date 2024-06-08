import PersonOutlineIcon from "@mui/icons-material/Person";

const users = {
	id: "group-users",
	title: "Contacts",
	type: "group",
	children: [
		{
			id: "user",
			title: "Liste de contacts",
			type: "item",
			url: "/contacts",
			icon: PersonOutlineIcon,
			breadcrumbs: false,
		},
	],
};

export default users;
