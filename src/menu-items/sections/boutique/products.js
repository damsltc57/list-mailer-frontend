// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";

const products = {
	id: "group-products",
	title: "Produits",
	type: "group",
	children: [
		{
			id: "list-products",
			title: "Liste des produits",
			type: "item",
			url: "boutique/produits",
			icon: ListIcon,
			breadcrumbs: false,
		},
		{
			id: "create-product",
			title: "Créer un produit",
			type: "item",
			url: "boutique/produit",
			icon: AddIcon,
			breadcrumbs: false,
		},
	],
};

export default products;
