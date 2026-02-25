// project import
import Navigation from "./Navigation";
import SimpleBar from "components/third-party/SimpleBar";
import { Box, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
	const menu = useSelector((state) => state.menu);
	const { drawerOpen } = menu;

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<SimpleBar
				sx={{
					"& .simplebar-content": {
						display: "flex",
						flexDirection: "column",
					},
					flexGrow: 1,
					height: "100%",
				}}
			>
				<Navigation />
			</SimpleBar>

			<Box sx={{ p: 2, mt: "auto" }}>
				<ListItemButton
					sx={{
						borderRadius: 3,
						color: "error.main",
						justifyContent: drawerOpen ? "flex-start" : "center",
						pl: drawerOpen ? 2 : 1.5,
						"&:hover": {
							bgcolor: "error.lighter",
						},
					}}
				>
					<ListItemIcon
						sx={{
							color: "error.main",
							minWidth: 36,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<LogoutIcon />
					</ListItemIcon>
					{drawerOpen && (
						<ListItemText
							primary={
								<Typography variant="h6" sx={{ fontWeight: 600, color: "error.main", ml: 1 }}>
									Logout
								</Typography>
							}
						/>
					)}
				</ListItemButton>
			</Box>
		</Box>
	);
};

export default DrawerContent;
