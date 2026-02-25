import React from "react";
import "../style/App.css";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import MainCard from "../components/MainCard";
import { getUserSignature } from "../store/reducers/userSlice";
import { useSelector } from "react-redux";
import { Image } from "@tiptap/extension-image";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
	Box,
	Button,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Typography,
	useTheme,
} from "@mui/material";
import ContactSelectionModal from "../components/home/ContactSelectionModal";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useGetGoogleOauthUrlQuery, useGetUserEmailAdressesQuery } from "../store/api/user";
import suggestion from "../components/editor/suggestion";
import SuggestionNode from "../components/editor/extensions/variableExtension";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { grey } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import AddressesEmailInfo from "../components/home/modal/AddressesEmailInfo";
import SendIcon from "@mui/icons-material/Send";
import CreateIcon from "@mui/icons-material/Create";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const StyledTextField = styled(TextField)(({ theme }) => {
	return {
		backgroundColor: "white",
		boxShadow: "inherit",
		borderRadius: 8,
		"& .MuiOutlinedInput-root": {
			borderRadius: 8,
			backgroundColor: "white",
		},
	};
});

const AttachmentItem = styled(Grid)(() => {
	return {
		"&:hover": {
			"& > .delete-container": {
				opacity: 1,
			},
		},
	};
});

const DeleteContainer = styled(IconButton)(({ theme }) => {
	return {
		position: "absolute",
		top: -8,
		right: -8,
		backgroundColor: theme.palette.error.main,
		color: "white",
		opacity: 0,
		padding: 4,
		transition: "all 0.2s ease",
		"&:hover": {
			backgroundColor: theme.palette.error.dark,
		},
		zIndex: 2,
	};
});

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

const extensions = [
	StarterKit.configure({
		hardBreak: false,
	}),
	Placeholder.configure({
		placeholder: "Écrivez le contenu de votre email ici...",
	}),
	Image.configure({ allowBase64: true }),
	SuggestionNode.configure({
		HTMLAttributes: {
			class: "mention",
		},
		suggestion,
	}),
];

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
					NOUVELLE CAMPAGNE
				</Typography>
				<Typography variant="h3" sx={{ fontWeight: "bold", mt: 1, mb: 1, maxWidth: "70%" }}>
					Créez votre message parfait
				</Typography>
				<Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3, maxWidth: "60%" }}>
					Rédigez l'objet, personnalisez le contenu et ajoutez des pièces jointes avant d'envoyer.
				</Typography>
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

function App() {
	const theme = useTheme();
	const signature = useSelector(getUserSignature);
	const contactModalRef = React.useRef(null);
	const [object, setObject] = React.useState(localStorage.getItem("draftObject") || "");
	const { data: emails, refetch: refetchUserList } = useGetUserEmailAdressesQuery();
	const [selectedAddress, setSelectedAddress] = React.useState(null);
	const [attachments, setAttachments] = React.useState([]);
	const { data: oauthUrl } = useGetGoogleOauthUrlQuery();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const currentSignature = React.useMemo(() => {
		return emails?.find((email) => email.id === selectedAddress)?.signature || "";
	}, [selectedAddress, emails]);

	const onContentUpdated = ({ editor }) => {
		localStorage.setItem("draftMail", editor.getHTML());
	};

	const handlerOauthLogin = () => {
		console.log(oauthUrl);
		window.location.assign(oauthUrl);
	};

	React.useEffect(() => {
		if (!!emails && !selectedAddress) {
			setSelectedAddress(emails[0]?.id);
		}
	}, [emails, selectedAddress]);

	const handleAddressChange = (event) => {
		setSelectedAddress(event.target.value);
	};

	const editor = useEditor({
		extensions,
		content: "",
		onUpdate: onContentUpdated,
	});

	const openContactModal = () => {
		contactModalRef.current?.open();
	};

	React.useEffect(() => {
		if (signature && editor) {
			const draft = localStorage.getItem("draftMail");
			if (draft) {
				editor.commands.setContent(draft);
			}
		}
	}, [signature, editor]);

	const onObjectUpdated = (event) => {
		localStorage.setItem("draftObject", event.target.value);
		setObject(event.target.value);
	};

	const removeAttachment = (index) => {
		setAttachments((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	const addFileToState = (event) => {
		if (event.target.files?.length > 0) {
			const files = Array.from(event.target.files);
			const data = files.map((file) => {
				const imageUrl = URL.createObjectURL(file);
				file.url = imageUrl;
				return file;
			});
			setAttachments((prevState) => [...prevState, ...data]);
		}
	};

	return (
		<Box sx={{ p: { xs: 2, md: 4 }, bgcolor: theme.palette.mode === "dark" ? "background.default" : "#f8f9fc", minHeight: "100vh" }}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Banner />

					{/* Composition Form Settings */}
					<Paper
						elevation={0}
						sx={{
							p: 4,
							borderRadius: 4,
							border: "1px solid",
							borderColor: "divider",
							mb: 4,
							display: "flex",
							flexDirection: "column",
							gap: 3,
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
							<Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: "primary.light", color: "primary.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
								<CreateIcon />
							</Box>
							<Typography variant="h6" fontWeight="bold">Paramètres du message</Typography>
						</Box>

						<Grid container spacing={3}>
							<Grid item xs={12} md={8}>
								<StyledTextField
									id="objects"
									label="Objet de l'e-mail *"
									variant="outlined"
									value={object}
									fullWidth
									onChange={onObjectUpdated}
									placeholder="Saisissez un objet percutant"
								/>
							</Grid>

							{!!selectedAddress ? (
								<Grid item xs={12} md={4} sx={{ display: "flex", gap: 1 }}>
									<FormControl fullWidth>
										<InputLabel id="sender-select-label">Expéditeur</InputLabel>
										<Select
											labelId="sender-select-label"
											id="sender-select"
											value={selectedAddress}
											label="Expéditeur"
											onChange={handleAddressChange}
											sx={{ borderRadius: 2, bgcolor: "white" }}
										>
											{emails?.map((email) => (
												<MenuItem key={email.id} value={email.id}>{email.email}</MenuItem>
											))}
										</Select>
									</FormControl>
									<IconButton onClick={handleOpen} aria-label="edit accounts" sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
										<EditIcon />
									</IconButton>
								</Grid>
							) : (
								<Grid item xs={12} md={4}>
									<Button
										variant={"outlined"}
										onClick={handleOpen}
										fullWidth
										sx={{ textTransform: "none", height: "100%", borderRadius: 2, borderStyle: "dashed", borderWidth: 2 }}
									>
										+ Lier un compte expéditeur
									</Button>
								</Grid>
							)}
						</Grid>
					</Paper>

					{/* Rich Text Editor */}
					<Paper
						elevation={0}
						sx={{
							borderRadius: 4,
							border: "1px solid",
							borderColor: "divider",
							mb: 4,
							overflow: "hidden",
							bgcolor: "white",
						}}
					>
						<Box sx={{ p: 4, pb: 2, borderBottom: "1px solid", borderColor: "divider", bgcolor: "grey.50" }}>
							<Typography variant="h6" fontWeight="bold">Corps de l'e-mail</Typography>
						</Box>
						<Box sx={{ p: 4, minHeight: 350, "& .ProseMirror": { minHeight: 300, outline: "none" } }}>
							<EditorContent editor={editor} />
							{currentSignature && (
								<Box sx={{ mt: 4, pt: 2, borderTop: "1px dashed", borderColor: "divider", opacity: 0.8 }}>
									<div dangerouslySetInnerHTML={{ __html: currentSignature }} />
								</Box>
							)}
						</Box>
					</Paper>

					{/* Attachments & Send Action */}
					<Grid container spacing={4}>
						<Grid item xs={12} md={8}>
							<Paper
								elevation={0}
								sx={{
									p: 4,
									borderRadius: 4,
									border: "1px solid",
									borderColor: "divider",
									height: "100%",
								}}
							>
								<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
									<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
										<Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: "info.light", color: "info.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
											<AttachFileIcon />
										</Box>
										<Typography variant="h6" fontWeight="bold">Pièces jointes</Typography>
									</Box>
									<Button
										component="label"
										role={undefined}
										variant="outlined"
										tabIndex={-1}
										startIcon={<CloudUploadIcon />}
										size="small"
										sx={{ borderRadius: 2 }}
									>
										Parcourir...
										<VisuallyHiddenInput onChange={addFileToState} multiple={true} type="file" />
									</Button>
								</Box>

								{attachments.length === 0 ? (
									<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 4, bgcolor: "grey.50", borderRadius: 2, border: "1px dashed", borderColor: "divider" }}>
										<Typography variant="body2" color="textSecondary">Aucun fichier sélectionné</Typography>
									</Box>
								) : (
									<Grid container spacing={2}>
										{attachments?.map((attachment, index) => (
											<AttachmentItem item xs={6} sm={4} md={3} key={attachment.name || index}>
												<Paper
													elevation={0}
													sx={{
														p: 1,
														border: "1px solid",
														borderColor: "divider",
														borderRadius: 2,
														position: "relative",
														display: "flex",
														flexDirection: "column",
														alignItems: "center",
														bgcolor: "grey.50",
														height: "100%",
													}}
												>
													<DeleteContainer
														onClick={() => removeAttachment(index)}
														className="delete-container"
														size="small"
													>
														<DeleteIcon fontSize="small" />
													</DeleteContainer>

													<Box sx={{ width: "100%", height: 80, display: "flex", alignItems: "center", justifyContent: "center", mb: 1, overflow: "hidden", borderRadius: 1 }}>
														{attachment?.url && attachment.type.includes("image") ? (
															<img style={{ objectFit: "cover", width: "100%", height: "100%" }} src={attachment.url} alt="attachment" />
														) : (
															<AttachFileIcon sx={{ fontSize: 40, color: "grey.400" }} />
														)}
													</Box>
													<Typography variant="caption" noWrap sx={{ width: "100%", textAlign: "center", fontWeight: "medium" }}>
														{attachment?.name}
													</Typography>
												</Paper>
											</AttachmentItem>
										))}
									</Grid>
								)}
							</Paper>
						</Grid>

						<Grid item xs={12} md={4}>
							<Paper
								elevation={0}
								sx={{
									p: 4,
									borderRadius: 4,
									border: "1px solid",
									borderColor: "divider",
									height: "100%",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									textAlign: "center",
									bgcolor: "#6c5ce7",
									color: "white",
									position: "relative",
									overflow: "hidden",
								}}
							>
								{/* Decorative background element */}
								<Box sx={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.1)" }} />

								<SendIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
								<Typography variant="h6" fontWeight="bold" mb={1}>
									Prêt à envoyer ?
								</Typography>
								<Typography variant="body2" sx={{ opacity: 0.8, mb: 4 }}>
									Sélectionnez les listes de contacts visées et programmez l'envoi de votre campagne.
								</Typography>

								<Button
									size="large"
									onClick={openContactModal}
									variant="contained"
									endIcon={<SendIcon />}
									sx={{
										bgcolor: "white",
										color: "#6c5ce7",
										fontWeight: "bold",
										borderRadius: 8,
										px: 4,
										py: 1.5,
										"&:hover": {
											bgcolor: "grey.100",
										},
										width: "100%",
									}}
								>
									Poursuivre
								</Button>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<ContactSelectionModal
				ref={contactModalRef}
				object={object}
				selectedAddress={selectedAddress}
				attachments={attachments}
				editor={editor}
				signature={signature}
				setObject={setObject}
			/>
			<AddressesEmailInfo
				open={open}
				handleClose={handleClose}
				emails={emails}
				refetchUserList={refetchUserList}
			/>
		</Box>
	);
}

export default App;
