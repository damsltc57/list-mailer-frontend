// assets
import Add from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
// icons
const icons = {
	Add,
	ListIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const odyssee = {
	id: "odyssee",
	title: "Odyssee",
	type: "group",
	children: [
		{
			id: "odyssee-liste",
			title: "Liste",
			type: "item",
			url: "odyssee/odyssee-liste",
			icon: icons.ListIcon,
			breadcrumbs: false,
		},
		{
			id: "odyssee-create",
			title: "Ajout",
			type: "item",
			url: "odyssee/odyssee-ajout",
			icon: icons.Add,
			breadcrumbs: false,
		},
	],
};

export default odyssee;
