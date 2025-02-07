import React from "react";
import MainCard from "../components/MainCard";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	Chip,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import AddContactModal from "../components/contactList/AddContactModal";
import { useGetContactListQuery, useGetContactListsQuery, useImportContactsMutation } from "../store/api/contact";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImportList from "../components/contactList/ImportList";

const ContactList = () => {
	const addContactRef = React.useRef(null);
	const [modalImportOpen, setModalImportOpen] = React.useState(false);
	const [selectedList, setSelectedList] = React.useState(0);
	const { data, refetch } = useGetContactListQuery({ list: selectedList });
	const { data: contactList, refetch: refetchContactLists } = useGetContactListsQuery();

	const handleListChange = (event) => {
		setSelectedList(event.target.value);
	};

	const openAddContact = (contact) => {
		addContactRef.current?.open(contact);
	};

	const openModalList = () => {
		setModalImportOpen(true);
	};

	const closeImportModal = () => {
		console.log("Closing");
		setModalImportOpen(false);
	};

	return (
		<React.Fragment>
			<Card sx={{ p: 2.5 }} title={"Contacts"}>
				<Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3, alignItems: "center" }}>
					<Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
						<Typography fontWeight={600}>Contacts</Typography>
						<FormControl sx={{ minWidth: 200 }}>
							<InputLabel id="demo-simple-select-label">Liste</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={selectedList}
								label="Age"
								onChange={handleListChange}
							>
								<MenuItem value={0}>Toutes</MenuItem>
								{contactList?.map((list) => (
									<MenuItem key={list.id} value={list.id}>
										{list.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ display: "flex", gap: 2 }}>
						<Button variant="contained" onClick={openModalList}>
							Ajouter une liste
						</Button>
						<Button variant="contained" onClick={openAddContact}>
							Ajouter
						</Button>
					</Box>
				</Box>
				<Grid container spacing={3}>
					{data?.map((contact) => (
						<Grid item xs={3} key={contact.id}>
							<Card sx={{ minWidth: 275 }}>
								<CardActionArea onClick={() => openAddContact(contact)}>
									<CardContent>
										<Typography
											sx={{ fontSize: 16 }}
											color="text.primary"
											gutterBottom
											fontWeight={700}
										>
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
						</Grid>
					))}
				</Grid>
			</Card>
			<AddContactModal ref={addContactRef} refetch={refetch} />
			<ImportList open={modalImportOpen} handleClose={closeImportModal} refetch={refetch} />
		</React.Fragment>
	);
};

export default ContactList;
