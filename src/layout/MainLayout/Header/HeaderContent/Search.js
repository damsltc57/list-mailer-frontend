// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";

// assets
import { SearchOutlined } from "@ant-design/icons";

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => (
	<Box sx={{ width: "100%", ml: { xs: 0, md: 1 } }}>
		<FormControl sx={{ width: { xs: '100%', md: 400 } }}>
			<OutlinedInput
				size="small"
				id="header-search"
				startAdornment={
					<InputAdornment position="start" sx={{ mr: 1, color: 'text.secondary' }}>
						<SearchOutlined />
					</InputAdornment>
				}
				aria-describedby="header-search-text"
				inputProps={{
					'aria-label': 'weight'
				}}
				placeholder="Rechercher Ctrl + K"
				sx={{
					bgcolor: 'white',
					borderRadius: 8,
					'& fieldset': {
						border: 'none',
					},
					boxShadow: '0 2px 14px rgba(0,0,0,0.03)',
					py: 0.25,
				}}
			/>
		</FormControl>
	</Box>
);

export default Search;
