// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

import { ErrorOutlineRounded } from "@mui/icons-material";

const payments = {
	id: "group-payments",
	title: "Bassine de rétentions",
	type: "group",
	children: [
		{
			id: "payment-problem",
			title: "Petite bassine",
			type: "item",
			url: "boutique/payment-problems",
			icon: ErrorOutlineRounded,
			breadcrumbs: false,
		},
		{
			id: "bassine-retentions",
			title: "Grande bassine",
			type: "item",
			url: "boutique/bassine-retentions",
			icon: ErrorOutlineRounded,
			breadcrumbs: false,
		},
	],
};

export default payments;
