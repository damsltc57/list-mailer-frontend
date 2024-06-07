// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

import ListIcon from "@mui/icons-material/List";

const partenaires = {
	id: "group-partenaires",
	title: "Partenaires",
	type: "group",
	children: [
		{
			id: "list-partenaires",
			title: "Liste des partenaires",
			type: "item",
			url: "partenaires/list",
			icon: ListIcon,
			breadcrumbs: false,
		},
	],
};

export default partenaires;
