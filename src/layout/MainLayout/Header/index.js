import React from "react";
import PropTypes from "prop-types";

import { useTheme } from "@mui/material/styles";
import { AppBar, Box, IconButton, Toolbar, useMediaQuery } from "@mui/material";

import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./HeaderContent";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const Header = ({ open, handleDrawerToggle }) => {
	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

	const [anchorEl, setAnchorEl] = React.useState(null);

	// common header
	const mainHeader = (
		<Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 2, sm: 3, md: 4 } }}>
			<Box>
				<IconButton
					disableRipple
					aria-label="open drawer"
					onClick={handleDrawerToggle}
					edge="start"
					color="secondary"
					sx={{
						zIndex: 1305,
						color: "text.primary",
						bgcolor: "white",
						border: "1px solid",
						borderColor: "divider",
						borderRadius: 2,
						ml: { xs: 0, lg: !open ? 6 : -2 },
						transition: "margin-left 0.25s",
					}}
				>
					{!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</IconButton>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
				<HeaderContent />
			</Box>
		</Toolbar>
	);

	// app-bar params
	const appBar = {
		position: "fixed",
		color: "inherit",
		elevation: 0,
		sx: {
			borderBottom: 'none',
			bgcolor: theme.palette.mode === "dark" ? "background.default" : "#f8f9fc",
			pt: 1, // Add slight padding to the top for better float matching
		},
	};

	return (
		<>
			{!matchDownMD ? (
				<AppBarStyled open={open} {...appBar}>
					{mainHeader}
				</AppBarStyled>
			) : (
				<AppBar {...appBar}>{mainHeader}</AppBar>
			)}
		</>
	);
};

Header.propTypes = {
	open: PropTypes.bool,
	handleDrawerToggle: PropTypes.func,
};

export default Header;
