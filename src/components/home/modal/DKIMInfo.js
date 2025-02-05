import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";

const DKIM_INFOS = [
	{ title: "domainName", value: "domainName" },
	{ title: "keySelector", value: "keySelector" },
	{ title: "privateKey", value: "privateKey" },
];

const DKIMInfo = ({ dkim, setDkim }) => {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const onValueChange = (value, type) => {
		setDkim((old) => ({ ...old, [type]: value }));
	};

	return (
		<div>
			<Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
					<Typography component="span">Informations DKIM</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						{DKIM_INFOS.map((info) => (
							<Grid item xs={12}>
								<Box>
									<TextField
										fullWidth
										id="outlined-controlled"
										label={info.title}
										value={dkim?.[info.value]}
										onChange={(event) => {
											onValueChange(event.target.value, info.value);
										}}
									/>
								</Box>
							</Grid>
						))}
					</Grid>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};

export default DKIMInfo;
