import { Box, Stack, Typography } from "@mui/material";

export default function SegmentedProgressBar({ stats, colors }) {
	const entries = Object.entries(stats);
	const total = entries.reduce((sum, [, v]) => sum + v, 0) || 1;

	return (
		<Box>
			{/* Barre */}
			<Stack
				direction="row"
				sx={{
					height: 16,
					borderRadius: 10,
					overflow: "hidden",
					bgcolor: "#eee",
				}}
			>
				{entries.map(([key, value]) => {
					if (!value) return null;
					const pct = (value / total) * 100;

					return (
						<Box
							key={key}
							sx={{
								width: `${pct}%`,
								bgcolor: colors[key] || "grey.500",
								transition: "width 0.3s ease",
							}}
						/>
					);
				})}
			</Stack>

			{/* Légende */}
			<Stack direction="row" spacing={2} mt={1} flexWrap="wrap">
				{entries.map(([key, value]) => {
					if (!value) return null;
					const pct = (value / total) * 100;

					return (
						<Stack key={key} direction="row" alignItems="center" spacing={1} sx={{ fontSize: 14 }}>
							<Box
								sx={{
									width: 12,
									height: 12,
									borderRadius: "50%",
									bgcolor: colors[key] || "grey.500",
								}}
							/>
							<Typography variant="body2">
								{key} ({value} • {pct.toFixed(1)}%)
							</Typography>
						</Stack>
					);
				})}
			</Stack>
		</Box>
	);
}
