import { Box, Modal, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import EmailSettings from "./EmailSettings";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";

const ModalContainer = styled(Box)(() => {
	return {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
});
const ModalSubContainer = styled(Box)(() => {
	return {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		minWidth: 800,
	};
});

const AddressesEmailInfo = ({ open, handleClose, emails, refetchUserList }) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Dialog onClose={handleClose} open={open} maxWidth={false}>
			<ModalContainer sx={{}}>
				<ModalSubContainer>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
							{emails?.map((email) => (
								<Tab label={email.email} />
							))}
							<Tab label={"Ajouter"} iconPosition="start" icon={<AddIcon />} />
						</Tabs>
					</Box>
					{emails?.map((email, index) => (
						<CustomTabPanel value={value} index={index}>
							<EmailSettings email={email} refetchUserList={refetchUserList} />
						</CustomTabPanel>
					))}
					<CustomTabPanel value={value} index={emails?.length}>
						<EmailSettings email={{}} refetchUserList={refetchUserList} />
					</CustomTabPanel>
				</ModalSubContainer>
			</ModalContainer>
		</Dialog>
	);
};

export default AddressesEmailInfo;

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}
