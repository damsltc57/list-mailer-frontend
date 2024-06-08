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

	const iconBackColor = "grey.100";
	const iconBackColorOpen = "grey.200";

	const [anchorEl, setAnchorEl] = React.useState(null);

	// common header
	const mainHeader = (
		<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
						bgcolor: open ? iconBackColorOpen : iconBackColor,
						ml: { xs: 0, lg: !open ? 6 : -2 },
						transition: "margin-left 0.3s",
					}}
				>
					{!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</IconButton>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center" }}>
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
			borderBottom: `1px solid ${theme.palette.divider}`,
			// boxShadow: theme.customShadows.z1
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
