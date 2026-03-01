import React from "react";
import "../style/App.css";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { useSelector } from "react-redux";
import { Image } from "@tiptap/extension-image";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import {
    Alert,
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
    useTheme,
    Snackbar,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useGetUserEmailAdressesQuery } from "../store/api/user";
import { useSendTestMailMutation } from "../store/api/testMail";
import { getUserSignature } from "../store/reducers/userSlice";
import suggestion from "../components/editor/suggestion";
import SuggestionNode from "../components/editor/extensions/variableExtension";
import AddressesEmailInfo from "../components/home/modal/AddressesEmailInfo";
import { useNavigate } from "react-router-dom";

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
        placeholder: "Écrivez le contenu de votre e-mail test ici...",
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
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                bgcolor: "#00b894",
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
                    TESTS
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1, mb: 1, maxWidth: "70%" }}>
                    Nouveau Mail de Test
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3, maxWidth: "60%" }}>
                    Envoyez-vous un e-mail pour vérifier la configuration ou valider le format avant un envoi de masse.
                </Typography>
                <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ borderColor: "rgba(255,255,255,0.5)", borderRadius: 2 }}
                    onClick={() => navigate("/test-mails")}
                >
                    Retour à l'historique
                </Button>
            </Box>

            <Box sx={{ position: "absolute", top: -50, right: -20, width: 250, height: 250, borderRadius: "50%", bgcolor: "rgba(255, 255, 255, 0.1)", zIndex: 0 }} />
            <Box sx={{ position: "absolute", bottom: -30, right: 150, width: 150, height: 150, borderRadius: "50%", bgcolor: "rgba(255, 255, 255, 0.1)", zIndex: 0 }} />
        </Box>
    );
};

const TestMailNew = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const signature = useSelector(getUserSignature);
    const { data: emails, refetch: refetchUserList } = useGetUserEmailAdressesQuery();

    const [object, setObject] = React.useState("");
    const [toAddress, setToAddress] = React.useState("");
    const [selectedAddress, setSelectedAddress] = React.useState("");
    const [attachments, setAttachments] = React.useState([]);
    const [openAccounts, setOpenAccounts] = React.useState(false);

    const [sendTestMail, { isLoading: isSending }] = useSendTestMailMutation();
    const [toast, setToast] = React.useState({ open: false, message: "", severity: "info" });

    const currentSignature = React.useMemo(() => {
        return emails?.find((email) => email.id === selectedAddress)?.signature || "";
    }, [selectedAddress, emails]);

    React.useEffect(() => {
        if (emails && emails.length > 0 && !selectedAddress) {
            setSelectedAddress(emails[0].id);
        }
    }, [emails, selectedAddress]);

    const editor = useEditor({
        extensions,
        content: "",
    });

    React.useEffect(() => {
        if (signature && editor) {
            editor.commands.setContent(`<p><br/></p><p><br/></p><p><br/></p>${signature}`);
        }
    }, [signature, editor]);

    const handleSend = async () => {
        if (!object || !selectedAddress || !toAddress) {
            setToast({ open: true, message: "Veuillez remplir tous les champs (destinataire, expéditeur, objet).", severity: "warning" });
            return;
        }

        try {
            const content = editor.getHTML();
            await sendTestMail({
                object,
                selectedAddress,
                to: toAddress,
                content,
                attachments
            }).unwrap();

            setToast({ open: true, message: "Mail de test envoyé avec succès !", severity: "success" });
            setTimeout(() => {
                navigate("/test-mails");
            }, 2000);
        } catch (err) {
            setToast({ open: true, message: "Erreur lors de l'envoi du mail de test.", severity: "error" });
            console.error("Test mail error", err);
        }
    };

    const removeAttachment = (index) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index));
    };

    const addFileToState = (event) => {
        if (event.target.files?.length > 0) {
            const files = Array.from(event.target.files);
            const data = files.map((file) => {
                file.url = URL.createObjectURL(file);
                return file;
            });
            setAttachments((prev) => [...prev, ...data]);
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: theme.palette.mode === "dark" ? "background.default" : "#f8f9fc", minHeight: "100vh" }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Banner />

                    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid", borderColor: "divider", mb: 4, display: "flex", flexDirection: "column", gap: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                            <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: "info.light", color: "info.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <CreateIcon />
                            </Box>
                            <Typography variant="h6" fontWeight="bold">Destinataire et Expéditeur</Typography>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <StyledTextField
                                    fullWidth
                                    label="E-mail de destination"
                                    placeholder="test@example.com"
                                    value={toAddress}
                                    onChange={(e) => setToAddress(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ display: "flex", gap: 1 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="sender-select-label">Expéditeur</InputLabel>
                                    <Select
                                        labelId="sender-select-label"
                                        id="sender-select"
                                        value={selectedAddress}
                                        label="Expéditeur"
                                        onChange={(e) => setSelectedAddress(e.target.value)}
                                        sx={{ borderRadius: 2, bgcolor: "white" }}
                                    >
                                        {emails?.map((email) => (
                                            <MenuItem key={email.id} value={email.id}>{email.email}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <IconButton onClick={() => setOpenAccounts(true)} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <StyledTextField
                                    fullWidth
                                    label="Objet de l'e-mail de test"
                                    value={object}
                                    onChange={(e) => setObject(e.target.value)}
                                    placeholder="Saisissez un objet percutant"
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid", borderColor: "divider", mb: 4, overflow: "hidden", bgcolor: "white" }}>
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

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid", borderColor: "divider", height: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: "info.light", color: "info.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <AttachFileIcon />
                                        </Box>
                                        <Typography variant="h6" fontWeight="bold">Pièces jointes</Typography>
                                    </Box>
                                    <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} size="small" sx={{ borderRadius: 2 }}>
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
                                        {attachments.map((attachment, index) => (
                                            <AttachmentItem item xs={6} sm={4} md={3} key={attachment.name || index}>
                                                <Paper elevation={0} sx={{ p: 1, border: "1px solid", borderColor: "divider", borderRadius: 2, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "grey.50", height: "100%" }}>
                                                    <DeleteContainer onClick={() => removeAttachment(index)} className="delete-container" size="small">
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
                                                        {attachment.name}
                                                    </Typography>
                                                </Paper>
                                            </AttachmentItem>
                                        ))}
                                    </Grid>
                                )}
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid", borderColor: "divider", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", bgcolor: "#00b894", color: "white", position: "relative", overflow: "hidden" }}>
                                <Box sx={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.1)" }} />
                                <SendIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                                <Typography variant="h6" fontWeight="bold" mb={1}>
                                    Prêt à tester ?
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8, mb: 4 }}>
                                    Le mail sera envoyé instantanément à l'adresse renseignée.
                                </Typography>

                                <Button
                                    size="large"
                                    onClick={handleSend}
                                    disabled={isSending}
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    sx={{
                                        bgcolor: "white",
                                        color: "#00b894",
                                        fontWeight: "bold",
                                        borderRadius: 8,
                                        px: 4,
                                        py: 1.5,
                                        "&:hover": { bgcolor: "grey.100" },
                                        width: "100%",
                                    }}
                                >
                                    {isSending ? "Envoi en cours..." : "Envoyer le test"}
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Snackbar
                open={toast.open}
                autoHideDuration={6000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%', borderRadius: 2 }}>
                    {toast.message}
                </Alert>
            </Snackbar>

            <AddressesEmailInfo
                open={openAccounts}
                handleClose={() => setOpenAccounts(false)}
                emails={emails}
                refetchUserList={refetchUserList}
            />
        </Box>
    );
};

export default TestMailNew;
