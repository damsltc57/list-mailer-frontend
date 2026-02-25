import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level }) => {
	const theme = useTheme();
	const menu = useSelector((state) => state.menu);
	const { drawerOpen } = menu;
	const location = useLocation();

	let itemTarget = "_self";
	if (item.target) {
		itemTarget = "_blank";
	}

	let listItemProps = {
		component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />),
	};
	if (item?.external) {
		listItemProps = { component: "a", href: item.url, target: itemTarget };
	}

	const Icon = item.icon;
	const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? "1.25rem" : "1.5rem" }} /> : false;

	const isSelected = item.url === location.pathname;

	const textColor = isSelected ? "text.primary" : "text.secondary";
	const iconColor = isSelected ? "#6c5ce7" : "text.secondary";

	return (
		<ListItemButton
			{...listItemProps}
			disabled={item.disabled}
			selected={isSelected}
			sx={{
				zIndex: 1201,
				mx: 1.5,
				mb: 0.5,
				borderRadius: 3,
				pl: drawerOpen ? `${level * 20}px` : 1.5,
				py: !drawerOpen && level === 1 ? 1.25 : 1,
				alignItems: "center",
				justifyContent: drawerOpen ? "flex-start" : "center",
				...(drawerOpen && {
					"&:hover": {
						bgcolor: "grey.50",
					},
					"&.Mui-selected": {
						bgcolor: "transparent",
						color: "text.primary",
						"&:hover": {
							bgcolor: "grey.100",
						},
					},
				}),
				...(!drawerOpen && {
					px: 0,
					"&:hover": {
						bgcolor: "transparent",
					},
					"&.Mui-selected": {
						"&:hover": {
							bgcolor: "transparent",
						},
						bgcolor: "transparent",
					},
				}),
			}}
		>
			{itemIcon && (
				<ListItemIcon
					sx={{
						minWidth: 36,
						color: iconColor,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						...(!drawerOpen && {
							borderRadius: 1.5,
							width: 36,
							height: 36,
							"&:hover": {
								bgcolor: "grey.100",
							},
						}),
						...(!drawerOpen &&
							isSelected && {
							bgcolor: "primary.lighter",
							"&:hover": {
								bgcolor: "primary.lighter",
							},
						}),
					}}
				>
					{itemIcon}
				</ListItemIcon>
			)}
			{(drawerOpen || (!drawerOpen && level !== 1)) && (
				<ListItemText
					primary={
						<Typography
							variant="h6"
							sx={{
								color: textColor,
								fontWeight: isSelected ? 600 : 500,
								fontSize: "0.95rem",
							}}
						>
							{item.title}
						</Typography>
					}
					sx={{ ml: 1 }}
				/>
			)}
			{(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
				<Chip
					color={item.chip.color}
					variant={item.chip.variant}
					size={item.chip.size}
					label={item.chip.label}
					avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
					sx={{ ml: 1 }}
				/>
			)}
		</ListItemButton>
	);
};

NavItem.propTypes = {
	item: PropTypes.object,
	level: PropTypes.number,
};

export default NavItem;
