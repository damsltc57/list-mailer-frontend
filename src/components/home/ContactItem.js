import React from "react";
import { Box, Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedContact, getSelectedContacts, removeSelectedContact } from "../../store/reducers/contactSlice";
import { blueGrey } from "@mui/material/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { styled } from "@mui/material/styles";
import { blue } from "@ant-design/colors";

const CheckContainer = styled(Box)(() => {
	return {
		position: "absolute",
		top: 5,
		right: 5,
		transition: "opacity 0.5s ease",
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
		<Card sx={{ backgroundColor: isSelected ? blueGrey[100] : "transparent" }} onClick={selectItem}>
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
					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
						{contact.formalityLevel === "informal" ? (
							<Chip sx={{ borderRadius: 20 }} label="Tutoiement" color="primary" />
						) : (
							<Chip sx={{ borderRadius: 20 }} label="Vouvoiement" color="success" />
						)}
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ContactItem;
