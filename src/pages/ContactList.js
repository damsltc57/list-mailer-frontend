import React from "react";
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
	useTheme,
	Avatar,
	Paper,
	Divider,
	CircularProgress,
} from "@mui/material";
import AddContactModal from "../components/contactList/AddContactModal";
import { useGetPaginatedContactListQuery, useGetContactListsQuery } from "../store/api/contact";
import ImportList from "../components/contactList/ImportList";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Banner = () => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				bgcolor: "#6c5ce7",
				borderRadius: 4,
				p: 4,
				mb: 4,
				color: "white",
				position: "relative",
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				minHeight: 200,
			}}
		>
			<Box sx={{ position: "relative", zIndex: 1 }}>
				<Typography variant="overline" sx={{ opacity: 0.8, letterSpacing: 1, fontWeight: "bold" }}>
					CONTACTS
				</Typography>
				<Typography variant="h3" sx={{ fontWeight: "bold", mt: 1, mb: 3, maxWidth: "70%" }}>
					Gérez vos listes et vos destinataires
				</Typography>
				<Box sx={{ display: "flex", gap: 2 }}>
				</Box>
			</Box>

			{/* Decorative Elements */}
			<Box
				sx={{
					position: "absolute",
					top: -50,
					right: -20,
					width: 250,
					height: 250,
					borderRadius: "50%",
					bgcolor: "rgba(255, 255, 255, 0.1)",
					zIndex: 0,
				}}
			/>
			<Box
				sx={{
					position: "absolute",
					bottom: -30,
					right: 150,
					width: 150,
					height: 150,
					borderRadius: "50%",
					bgcolor: "rgba(255, 255, 255, 0.1)",
					zIndex: 0,
				}}
			/>
		</Box>
	);
};

const ContactList = () => {
	const theme = useTheme();
	const addContactRef = React.useRef(null);
	const [modalImportOpen, setModalImportOpen] = React.useState(false);
	const [selectedList, setSelectedList] = React.useState(0);
	const [page, setPage] = React.useState(1);
	const { data, refetch, isFetching } = useGetPaginatedContactListQuery({ list: selectedList, page, limit: 20 });
	const { data: contactList } = useGetContactListsQuery();

	const handleListChange = (event) => {
		setSelectedList(event.target.value);
		setPage(1);
	};

	const observer = React.useRef();
	const lastContactElementRef = React.useCallback(
		(node) => {
			if (isFetching) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && data && page < data.totalPages) {
					setPage((prevPage) => prevPage + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isFetching, data, page]
	);

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
		<Box sx={{ p: { xs: 2, md: 4 }, bgcolor: theme.palette.mode === "dark" ? "background.default" : "#f8f9fc", minHeight: "100vh" }}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Banner />

					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
						<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
							<Typography variant="h5" fontWeight="bold">
								Annuaire
							</Typography>
							<FormControl size="small" sx={{ minWidth: 200, bgcolor: "background.paper", borderRadius: 2 }}>
								<InputLabel id="list-select-label">Liste de contacts</InputLabel>
								<Select
									labelId="list-select-label"
									id="list-select"
									value={selectedList}
									label="Liste de contacts"
									onChange={handleListChange}
									sx={{ borderRadius: 2 }}
								>
									<MenuItem value={0}>Toutes les listes</MenuItem>
									{contactList?.map((list) => (
										<MenuItem key={list.id} value={list.id}>
											{list.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>

						<Box sx={{ display: "flex", gap: 2 }}>
							<Button
								variant="outlined"
								startIcon={<GroupAddIcon />}
								onClick={openModalList}
								sx={{
									borderRadius: 8,
									textTransform: "none",
									fontWeight: "bold",
									borderColor: "divider",
									color: "text.primary",
									"&:hover": { borderColor: "primary.main", bgcolor: "primary.light", color: "primary.main" }
								}}
							>
								Nouvelle Liste
							</Button>
							<Button
								variant="contained"
								startIcon={<PersonAddIcon />}
								onClick={() => openAddContact()}
								sx={{
									bgcolor: "#6c5ce7",
									color: "white",
									borderRadius: 8,
									px: 3,
									textTransform: "none",
									fontWeight: "bold",
									"&:hover": {
										bgcolor: "#5b4bc4",
									},
								}}
							>
								Ajouter un contact
							</Button>
						</Box>
					</Box>

					<Grid container spacing={3}>
						{!data?.contacts || data.contacts.length === 0 ? (
							<Grid item xs={12}>
								<Paper
									elevation={0}
									sx={{
										p: 6,
										textAlign: "center",
										bgcolor: "transparent",
										border: "2px dashed",
										borderColor: "divider",
										borderRadius: 4,
									}}
								>
									<Typography variant="h6" color="textSecondary" fontWeight="medium">
										Aucun contact trouvé dans cette liste.
									</Typography>
								</Paper>
							</Grid>
						) : (
							data.contacts.map((contact, index) => {
								const isLastElement = data.contacts.length === index + 1;
								return (
									<Grid
										ref={isLastElement ? lastContactElementRef : null}
										item xs={12} sm={6} md={4} lg={3} key={contact.id}
									>
										<Card
											sx={{
												height: "100%",
												display: "flex",
												flexDirection: "column",
												borderRadius: 4,
												border: "1px solid",
												borderColor: "divider",
												boxShadow: "none",
												transition: "transform 0.2s, box-shadow 0.2s",
												"&:hover": {
													transform: "translateY(-4px)",
													boxShadow: theme.shadows[10],
												},
											}}
										>
											<CardActionArea onClick={() => openAddContact(contact)} sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
												<Box
													sx={{
														height: 100,
														bgcolor: "grey.50",
														position: "relative",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														borderBottom: "1px solid",
														borderColor: "divider",
													}}
												>
													<Avatar
														sx={{
															width: 64,
															height: 64,
															bgcolor: "#6c5ce7",
															fontSize: "1.5rem",
															fontWeight: "bold",
															position: "absolute",
															bottom: -32,
															border: "4px solid white",
														}}
													>
														{contact?.firstName?.charAt(0) || <PersonIcon />}
													</Avatar>
												</Box>

												<CardContent sx={{ flexGrow: 1, pt: 6, textAlign: "center" }}>
													<Typography variant="h6" fontWeight="bold" noWrap gutterBottom>
														{`${contact?.firstName} ${contact?.lastName || ''}`}
													</Typography>
													<Typography variant="body2" color="textSecondary" gutterBottom sx={{ mb: 2 }}>
														{contact.email}
													</Typography>

													<Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
														{contact.formalityLevel === "informal" ? (
															<Chip size="small" sx={{ borderRadius: 20, fontWeight: "medium" }} label="Tutoiement" color="primary" variant="outlined" />
														) : (
															<Chip size="small" sx={{ borderRadius: 20, fontWeight: "medium" }} label="Vouvoiement" color="success" variant="outlined" />
														)}
													</Box>

													<Divider sx={{ my: 1.5 }} />

													<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
														<Typography variant="caption" fontWeight="medium" color="textSecondary">
															Entreprise:
														</Typography>
														<Typography variant="caption" fontWeight="bold" color="textPrimary" noWrap>
															{contact?.companyName || "N/A"}
														</Typography>
													</Box>
												</CardContent>
											</CardActionArea>
										</Card>
									</Grid>
								);
							})
						)}
						{isFetching && (
							<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
								<CircularProgress />
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>

			<AddContactModal ref={addContactRef} refetch={refetch} />
			<ImportList open={modalImportOpen} handleClose={closeImportModal} refetch={refetch} />
		</Box>
	);
};

export default ContactList;
