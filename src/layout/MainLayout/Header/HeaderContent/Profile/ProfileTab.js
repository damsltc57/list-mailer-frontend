import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

// assets
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const [selectedIndex, setSelectedIndex] = useState(0);
	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	const logout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<List
			component="nav"
			sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32, color: theme.palette.grey[500] } }}
		>
			<ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
				<ListItemIcon>
					<LogoutOutlined />
				</ListItemIcon>
				<ListItemText primary="Se déconnecter" onClick={logout} />
			</ListItemButton>
		</List>
	);
};

ProfileTab.propTypes = {
	handleLogout: PropTypes.func,
};

export default ProfileTab;
