// project import
import React from "react";

import { useGetAdminQuery } from "../store/api/user";
import sections from "./sections";
// ==============================|| MENU ITEMS ||============================== //

const useGetMenuItem = () => {
	const { data: adminUser } = useGetAdminQuery({});

	return {
		items: sections,
	};
};

export default useGetMenuItem;
