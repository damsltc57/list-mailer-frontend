// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

import { DashboardOutlined } from "@ant-design/icons";

const stats = {
	id: "group-stats",
	title: "Stats",
	type: "group",
	children: [
		{
			id: "stats-abos",
			title: "Stats abos",
			type: "item",
			url: "boutique/stats-abos",
			icon: DashboardOutlined,
			breadcrumbs: false,
		},
	],
};

export default stats;
