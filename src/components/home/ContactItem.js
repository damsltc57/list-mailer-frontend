import React from "react";
import { Box, Card, CardActionArea, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedContact, getSelectedContacts, removeSelectedContact } from "../../store/reducers/contactSlice";
import { blueGrey } from "@mui/material/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { styled } from "@mui/material/styles";
import { blue } from "@ant-design/colors";

const CheckContainer = styled(Box)(() => {
	return {
		position: "absolute",
		top: 15,
		right: 5,
		transition: "opacity 0.5s ease"
	};
});

const StyledChip = styled(Chip)(() => {
	return {
		"& .MuiChip-label": {
			fontSize: 10, paddingLeft: 5,
			paddingRight: 5
		},
		height: 24
	};
});

const ContactItem = ({ contact }) => {
	const dispatch = useDispatch();
	const selectedContacts = useSelector(getSelectedContacts);

	const isSelected = React.useMemo(() => {
		return selectedContacts?.some((item) => item.id === contact.id);
	}, [contact, selectedContacts]);

	const selectItem = () => {
		if (isSelected) {
			dispatch(removeSelectedContact(contact));
		} else {
			dispatch(addSelectedContact(contact));
		}
	};

	return (
		<Card sx={{ backgroundColor: isSelected ? blueGrey[100] : "transparent", overflow: "visible" }}
			  onClick={selectItem}>
			<CardActionArea>
				<CardContent>
					<CheckContainer sx={{ opacity: +isSelected }}>
						<CheckCircleOutlineIcon color={"primary"} sx={{ fontSize: 30 }} />
					</CheckContainer>
					<Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom fontWeight={700}>
						{contact?.companyName}
					</Typography>
					<Typography sx={{ fontSize: 14 }} color="text.primary">
						{`${contact?.firstName} ${contact?.firstName}`}
					</Typography>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						{contact.email}
					</Typography>
					<Box sx={{
						display: "flex",
						justifyContent: "flex-end",
						position: "absolute",
						top: -10,
						right: -20,
						zIndex: 1000,
						overflow: "visible"
					}}>
						{contact.formalityLevel === "informal" ? (
							<StyledChip sx={{ borderRadius: 20 }} label="Tutoiement" color="primary" />
						) : (
							<StyledChip sx={{ borderRadius: 20 }} label="Vouvoiement" color="success" />
						)}
					</Box>
					{contact?.collaborators?.map((collaborator) => (
						<Chip label={collaborator.firstName}/>
					))}
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ContactItem;
