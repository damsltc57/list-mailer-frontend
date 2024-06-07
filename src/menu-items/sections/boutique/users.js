// assets
import { DashboardOutlined } from "@ant-design/icons";
import PersonOutlineIcon from "@mui/icons-material/Person";
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const users = {
	id: "group-users",
	title: "Utilisateurs",
	type: "group",
	children: [
		{
			id: "user",
			title: "Utilisateur",
			type: "item",
			url: "boutique/user",
			icon: PersonOutlineIcon,
			breadcrumbs: false,
		},
	],
};

export default users;
