import React, { forwardRef } from "react";
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	Typography,
} from "@mui/material";
import MainCard from "../MainCard";
import TextField from "@mui/material/TextField";
import { useCreateContactMutation, useUpdateContactMutation } from "../../store/api/contact";
import { red } from "@mui/material/colors";
import { useSnackbar } from "notistack";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	boxShadow: 24,
	borderRadius: 10,
	minWidth: 600,
	p: 4,
};

const AddContactModal = forwardRef(function AddContactModal({ refetch }, ref) {
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [companyName, setCompanyName] = React.useState("");
	const [hasError, setHasError] = React.useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const [editingId, setEditingId] = React.useState(null);

	const [open, setOpen] = React.useState(false);
	const [companyCategories, setCompanyCategory] = React.useState({
		tvProducer: false,
		filmProducer: false,
		broadcaster: false,
		distributor: false,
	});

	const [formalityLevel, setFormalityLevel] = React.useState("");

	const [createContactQuery] = useCreateContactMutation();
	const [updateContactQuery] = useUpdateContactMutation();

	const { tvProducer, filmProducer, broadcaster, distributor } = companyCategories;

	const createContact = () => {
		const query = !!editingId ? updateContactQuery : createContactQuery;
		setHasError(false);
		query({
			firstName,
			lastName,
			email,
			companyName,
			tvProducer,
			filmProducer,
			broadcaster,
			distributor,
			formalityLevel,
			id: editingId,
		})
			.then((response) => {
				if (response?.error) {
					enqueueSnackbar("Il y a eu une erreur", { variant: "error" });
					setHasError(true);
				} else {
					refetch();
					enqueueSnackbar(!!editingId ? "Le contact a été modifié" : "Le contact a été créé", {
						variant: "success",
					});
					setOpen(false);
				}
			})
			.catch(() => {
				setHasError(true);
			});
	};

	const handleFormalityLevelChange = (event) => {
		setFormalityLevel(event.target.value);
	};

	React.useImperativeHandle(ref, () => {
		return {
			open(contact) {
				if (contact) {
					setEditingId(contact.id);
					setFirstName(contact.firstName);
					setLastName(contact.lastName);
					setEmail(contact.email);
					setCompanyName(contact.companyName);
					setFormalityLevel(contact.formalityLevel);
					const { tvProducer, filmProducer, broadcaster, distributor } = contact;
					setCompanyCategory({ tvProducer, filmProducer, broadcaster, distributor });
				}
				setOpen(true);
			},
		};
	}, []);

	const handleChange = (event) => {
		setCompanyCategory({
			...companyCategories,
			[event.target.name]: event.target.checked,
		});
	};

	const handleClose = () => setOpen(false);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box style={modalStyle}>
				<MainCard title={"Ajouter un contact"}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								id="firstName"
								label="Prénom"
								variant="outlined"
								value={firstName}
								fullWidth
								onChange={(event) => setFirstName(event.target.value)}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								id="lastName"
								label="Nom"
								variant="outlined"
								value={lastName}
								fullWidth
								onChange={(event) => setLastName(event.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="email"
								label="Email"
								variant="outlined"
								value={email}
								fullWidth
								onChange={(event) => setEmail(event.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="companyName"
								label="Nom de la société"
								variant="outlined"
								value={companyName}
								fullWidth
								onChange={(event) => setCompanyName(event.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Niveau de formalité</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={formalityLevel}
									label="Niveau de formalité"
									onChange={handleFormalityLevelChange}
								>
									<MenuItem value={"informal"}>Tutoiement</MenuItem>
									<MenuItem value={"formal"}>Vouvoiement</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl sx={{}} component="fieldset" variant="standard">
								<FormLabel component="legend">Catégories</FormLabel>
								<FormGroup sx={{ marginLeft: 2 }}>
									<FormControlLabel
										control={
											<Checkbox checked={tvProducer} onChange={handleChange} name="tvProducer" />
										}
										label="Producteur télé"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={filmProducer}
												onChange={handleChange}
												name="filmProducer"
											/>
										}
										label="Producteur ciné"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={broadcaster}
												onChange={handleChange}
												name="broadcaster"
											/>
										}
										label="Diffuseur"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={distributor}
												onChange={handleChange}
												name="distributor"
											/>
										}
										label="Distributeur"
									/>
								</FormGroup>
							</FormControl>
						</Grid>
						{!!hasError && (
							<Grid item xs={12}>
								<Typography color={red[500]}>Il y a eu une erreur</Typography>
							</Grid>
						)}
					</Grid>
					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
						<Button onClick={createContact} variant={"contained"}>
							Ajouter
						</Button>
					</Box>
				</MainCard>
			</Box>
		</Modal>
	);
});

export default AddContactModal;
