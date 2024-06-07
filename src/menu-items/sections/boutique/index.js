import orders from "./orders";
import payments from "./payments";
import users from "./users";
import stats from "./stats";
import products from "./products";

const savSection = {
	id: "boutique",
	url: "boutique",
	title: "Boutique",
	categories: [orders, payments, users, stats, products],
};

export default savSection;
