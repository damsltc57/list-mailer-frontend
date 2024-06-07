// assets
import { DashboardOutlined } from "@ant-design/icons";
import PaymentsIcon from "@mui/icons-material/Payments";
import Add from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
// icons
const icons = {
	DashboardOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const orders = {
	id: "group-orders",
	title: "Commandes",
	type: "group",
	children: [
		{
			id: "dashboard",
			title: "Commandes à traiter",
			type: "item",
			url: "boutique/process-orders",
			icon: icons.DashboardOutlined,
			breadcrumbs: false,
		},
		{
			id: "orders",
			title: "Commandes à valider",
			type: "item",
			url: "boutique/orders",
			icon: icons.DashboardOutlined,
			breadcrumbs: false,
		},
		{
			id: "unpaidOrders",
			title: "Commandes non payées",
			type: "item",
			url: "boutique/unpaid-orders",
			icon: PaymentsIcon,
			breadcrumbs: false,
		},
		{
			id: "order",
			title: "Recherche rapide",
			type: "item",
			url: "boutique/order",
			icon: SearchIcon,
			breadcrumbs: false,
		},
		{
			id: "createOrder",
			title: "Créer une commande",
			type: "item",
			url: "boutique/create-order?",
			icon: Add,
			breadcrumbs: false,
		},
	],
};

export default orders;
