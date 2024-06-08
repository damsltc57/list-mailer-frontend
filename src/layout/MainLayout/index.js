import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Toolbar, useMediaQuery } from "@mui/material";

// project import
import Drawer from "./Drawer";
import Header from "./Header";
import getMenuItem from "menu-items";
import Breadcrumbs from "components/@extended/Breadcrumbs";

// types
import { openDrawer } from "store/reducers/menu";
import { getAuthToken } from "../../store/reducers/userSlice";
import { useLazyGetUserQuery } from "../../store/api/user";

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ authenticated = false }) => {
	const theme = useTheme();
	const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
	const dispatch = useDispatch();
	const token = useSelector(getAuthToken);
	const [fetchUser] = useLazyGetUserQuery();

	const navigate = useNavigate();
	const menuItems = getMenuItem();

	useEffect(() => {
		if (authenticated) {
			if (!token) {
				navigate("/login");
			} else {
				fetchUser();
			}
		}
	}, [token]);

	const { drawerOpen } = useSelector((state) => state.menu);

	// drawer toggler
	const [open, setOpen] = useState(drawerOpen);
	const handleDrawerToggle = () => {
		setOpen(!open);
		dispatch(openDrawer({ drawerOpen: !open }));
	};

	// set media wise responsive drawer
	useEffect(() => {
		setOpen(!matchDownLG);
		dispatch(openDrawer({ drawerOpen: !matchDownLG }));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchDownLG]);

	useEffect(() => {
		if (open !== drawerOpen) setOpen(drawerOpen);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [drawerOpen]);

	return (
		<Box sx={{ display: "flex", width: "100%" }}>
			<Header open={open} handleDrawerToggle={handleDrawerToggle} />
			<Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
			<Box component="main" sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}>
				<Toolbar />
				<Breadcrumbs navigation={menuItems} title titleBottom card={false} divider={false} />
				<Outlet />
			</Box>
		</Box>
	);
};

export default MainLayout;
