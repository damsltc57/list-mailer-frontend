import * as React from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
const ITEM_HEIGHT = 48;

const IMenu = React.forwardRef(function IMenu({ options }, ref) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	React.useImperativeHandle(
		ref,
		() => {
			return {};
		},
		[]
	);

	const handleClick = (event) => {
		event.stopPropagation();
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "20ch",
					},
				}}
			>
				{options?.map((option) => (
					<MenuItem
						key={option.title}
						onClick={(event) => {
							event?.stopPropagation();
							option?.callBack();
							handleClose();
						}}
					>
						{option.title}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
});

export default IMenu;
