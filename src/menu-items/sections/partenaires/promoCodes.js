// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";

const promoCodes = {
	id: "group-promoCodes",
	title: "Codes promo",
	type: "group",
	children: [
		{
			id: "list-promoCodes",
			title: "Liste des codes promo",
			type: "item",
			url: "partenaires/promoCodes",
			icon: ListIcon,
			breadcrumbs: false,
		},
		{
			id: "create-promoCode",
			title: "Créer un code promo",
			type: "item",
			url: "partenaires/createEditPromoCode",
			icon: AddIcon,
			breadcrumbs: false,
		},
	],
};

export default promoCodes;
