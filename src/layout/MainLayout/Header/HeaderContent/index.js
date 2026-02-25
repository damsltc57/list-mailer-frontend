// material-ui
import { Box, useMediaQuery } from "@mui/material";

// project import
import Profile from "./Profile";
import MobileSection from "./MobileSection";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
	const matchesXs = useMediaQuery((theme) => theme.breakpoints.down("md"));

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', width: '100%', ml: { xs: 1, md: 2 } }}>
			<Box sx={{ flexGrow: 1 }} />

			{!matchesXs && <Profile />}
			{matchesXs && <MobileSection />}
		</Box>
	);
};

export default HeaderContent;
