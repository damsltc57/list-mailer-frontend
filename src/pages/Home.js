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

import {
	Box,
	Button,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Typography,
} from "@mui/material";
import ContactSelectionModal from "../components/home/ContactSelectionModal";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useGetUserEmailAdressesQuery } from "../store/api/user";
import suggestion from "../components/editor/suggestion";
import SuggestionNode from "../components/editor/extensions/variableExtension";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { grey } from "@mui/material/colors";

const StyledTextField = styled(TextField)(({ theme }) => {
	return {
		backgroundColor: "white",
		boxShadow: "inherit",
		borderRadius: 2,
		borderColor: theme.palette.divider,
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
		top: 2,
		right: 2,
		backgroundColor: grey[200],
		opacity: 0,
		transition: "all 0.3s ease",
		"&:hover": {
			backgroundColor: grey[400],
		},
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
		placeholder: "Écrivez quelque chose...",
	}),
	Image,
	SuggestionNode.configure({
		HTMLAttributes: {
			class: "mention",
		},
		suggestion,
	}),
	// HardBreak.extend({
	// 	addKeyboardShortcuts() {
	// 		return {
	// 			Enter: () => this.editor.commands.setHardBreak(),
	// 		};
	// 	},
	// }),
];

function App() {
	const signature = useSelector(getUserSignature);
	const contactModalRef = React.useRef(null);
	const [object, setObject] = React.useState(localStorage.getItem("draftObject") || "");
	const { data: emails } = useGetUserEmailAdressesQuery();
	const [selectedAddress, setSelectedAddress] = React.useState(null);
	const [attachments, setAttachments] = React.useState([]);

	const onContentUpdated = ({ editor }) => {
		localStorage.setItem("draftMail", editor.getHTML());
		// console.log(editor.getHTML());
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
			} else {
				editor.commands.setContent(`<p><br/></p><p><br/></p><p><br/></p>${signature}`);
				editor.commands.focus("start");
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
		<div className="App">
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<StyledTextField
						id="objects"
						label="Objet"
						variant="outlined"
						value={object}
						fullWidth
						onChange={onObjectUpdated}
					/>
				</Grid>
				{!!selectedAddress && (
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Email</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={selectedAddress}
								label="Email"
								onChange={handleAddressChange}
							>
								{emails?.map((email) => (
									<MenuItem value={email.id}>{email.email}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				)}
				<Grid item xs={12}>
					<MainCard contentSX={{ p: 2.25 }}>
						<EditorContent editor={editor} />
					</MainCard>
				</Grid>
				<Grid item xs={12}>
					<MainCard contentSX={{ p: 2.25 }}>
						<Button
							component="label"
							role={undefined}
							variant="contained"
							tabIndex={-1}
							startIcon={<CloudUploadIcon />}
						>
							Ajouter des pièces jointes
							<VisuallyHiddenInput onChange={addFileToState} multiple={true} type="file" />
						</Button>
						<Grid container mt={2} spacing={2} alignItems={"stretch"}>
							{attachments?.map((attachment, index) => (
								<AttachmentItem
									item
									xs={3}
									sx={{ minHeight: 20, position: "relative" }}
									key={attachment.name}
								>
									<DeleteContainer
										onClick={() => removeAttachment(index)}
										className={"delete-container"}
										color="error"
										aria-label="delete"
									>
										<DeleteIcon />
									</DeleteContainer>
									<Paper elevation={1}>
										{attachment?.url && attachment.type.includes("image") && (
											<img height={"100%"} width={"100%"} src={attachment.url} />
										)}
										<Typography m={1}>{attachment?.name}</Typography>
									</Paper>
								</AttachmentItem>
							))}
						</Grid>
					</MainCard>
				</Grid>
				<Grid item xs={12}>
					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
						<Button onClick={openContactModal} variant="contained">
							Choix des destinataires
						</Button>
					</Box>
				</Grid>
			</Grid>
			<ContactSelectionModal ref={contactModalRef} />
		</div>
	);
}

export default App;
