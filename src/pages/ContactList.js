import React from "react";
import MainCard from "../components/MainCard";
import { Box, Button, Card, CardActionArea, CardContent, Chip, Grid, Typography } from "@mui/material";
import AddContactModal from "../components/contactList/AddContactModal";
import { useGetContactListQuery, useImportContactsMutation } from "../store/api/contact";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

const ContactList = () => {
	const addContactRef = React.useRef(null);
	const { data, refetch } = useGetContactListQuery();
	const [importContacts] = useImportContactsMutation();

	const openAddContact = (contact) => {
		addContactRef.current?.open(contact);
	};

	const uploadFile = (files) => {
		if (files[0]) {
			importContacts({ file: files[0] });
		}
	};

	return (
		<React.Fragment>
			<MainCard
				title={"Contacts"}
				secondary={
					<Box sx={{ display: "flex", gap: 2 }}>
						<Button
							component="label"
							role={undefined}
							tabIndex={-1}
							variant="contained"
							startIcon={<CloudUploadIcon />}
						>
							Importer csv
							<VisuallyHiddenInput
								onChange={(event) => uploadFile(event.target.files)}
								accept=".csv"
								type="file"
							/>
						</Button>
						<Button variant="contained" onClick={openAddContact}>
							Ajouter
						</Button>
					</Box>
				}
			>
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
			</MainCard>
			<AddContactModal ref={addContactRef} refetch={refetch} />
		</React.Fragment>
	);
};

export default ContactList;
