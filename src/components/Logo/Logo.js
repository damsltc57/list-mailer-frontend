// material-ui
import { useTheme } from "@mui/material/styles";

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

import { Box, Typography } from "@mui/material";

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
	const theme = useTheme();

	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
			<Box
				sx={{
					width: 32,
					height: 32,
					borderRadius: "50%",
					bgcolor: "#6c5ce7",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexShrink: 0
				}}
			>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 2C12 7.52 16.48 12 22 12C16.48 12 12 16.48 12 22C12 16.48 7.52 12 2 12C7.52 12 12 7.52 12 2Z"
						fill="white"
					/>
				</svg>
			</Box>
			<Typography
				variant="h4"
				sx={{
					color: "text.primary",
					fontWeight: 600,
					letterSpacing: "-0.02em",
					lineHeight: 1,
					mb: 0.25
				}}
			>
				Mailer
			</Typography>
		</Box>
	);
};

export default Logo;
