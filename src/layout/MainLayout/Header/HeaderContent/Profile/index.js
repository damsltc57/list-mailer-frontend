import PropTypes from "prop-types";
import { useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
	Avatar,
	Box,
	ButtonBase,
	CardContent,
	ClickAwayListener,
	Grid,
	IconButton,
	Paper,
	Popper,
	Stack,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";

// project import
import MainCard from "components/MainCard";
import Transitions from "components/@extended/Transitions";
import ProfileTab from "./ProfileTab";
import SettingTab from "./SettingTab";

// assets
import avatar1 from "assets/images/users/avatar-1.png";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`profile-tabpanel-${index}`}
			aria-labelledby={`profile-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `profile-tab-${index}`,
		"aria-controls": `profile-tabpanel-${index}`,
	};
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
	const theme = useTheme();

	const handleLogout = async () => {
		// logout
	};

	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const iconBackColorOpen = "grey.300";

	return (
		<Box sx={{ flexShrink: 0, ml: 0.75 }}>
			<ButtonBase
				sx={{
					p: 0.25,
					bgcolor: open ? iconBackColorOpen : "transparent",
					borderRadius: 1,
					"&:hover": { bgcolor: "secondary.lighter" },
				}}
				aria-label="open profile"
				ref={anchorRef}
				aria-controls={open ? "profile-grow" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
					<Typography variant="subtitle1">Mon profil</Typography>
				</Stack>
			</ButtonBase>
			<Popper
				placement="bottom-end"
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				popperOptions={{
					modifiers: [
						{
							name: "offset",
							options: {
								offset: [0, 9],
							},
						},
					],
				}}
			>
				{({ TransitionProps }) => (
					<Transitions type="fade" in={open} {...TransitionProps}>
						{open && (
							<Paper
								sx={{
									boxShadow: theme.customShadows.z1,
									width: 290,
									minWidth: 240,
									maxWidth: 290,
									[theme.breakpoints.down("md")]: {
										maxWidth: 250,
									},
								}}
							>
								<ClickAwayListener onClickAway={handleClose}>
									<MainCard elevation={0} border={false} content={false}>
										{open && (
											<>
												<ProfileTab handleLogout={handleLogout} />
											</>
										)}
									</MainCard>
								</ClickAwayListener>
							</Paper>
						)}
					</Transitions>
				)}
			</Popper>
		</Box>
	);
};

export default Profile;
