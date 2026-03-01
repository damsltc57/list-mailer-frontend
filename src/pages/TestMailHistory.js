import React from "react";
import { useGetTestMailHistoryQuery } from "../store/api/testMail";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid,
    Modal,
    Paper,
    Typography,
    useTheme,
    Chip
} from "@mui/material";
import dayjs from "dayjs";
import HistoryIcon from "@mui/icons-material/History";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    maxWidth: "80vw",
    maxHeight: "90vh",
    overflow: "auto",
    borderRadius: 3,
    p: 4,
    bgcolor: "background.paper",
    boxShadow: 24,
};

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
            <Box sx={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <Box>
                    <Typography variant="overline" sx={{ opacity: 0.8, letterSpacing: 1, fontWeight: "bold" }}>
                        TESTS
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1, mb: 3 }}>
                        Historique de vos tests
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: "80%", lineHeight: 1.6 }}>
                        Consultez les envois tests réalisés, vérifiez le bon fonctionnement de vos comptes et validez vos e-mails avant de les envoyer.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="inherit"
                    sx={{ color: "#00b894", fontWeight: "bold", px: 3, py: 1.5, borderRadius: 2 }}
                    onClick={() => navigate("/test-mails/new")}
                >
                    Nouveau mail de test
                </Button>
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
        </Box>
    );
};

const TestMailHistory = () => {
    const theme = useTheme();
    const [openModalItem, setOpenModalItem] = React.useState(null);
    const { data, isLoading } = useGetTestMailHistoryQuery({});

    const handleOpen = (item) => setOpenModalItem(item);
    const handleClose = () => setOpenModalItem(null);

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: theme.palette.mode === "dark" ? "background.default" : "#f8f9fc", minHeight: "100vh" }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Banner />

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h5" fontWeight="bold">
                            Vos derniers tests
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {isLoading ? (
                            <Grid item xs={12}>
                                <Typography color="textSecondary">Chargement...</Typography>
                            </Grid>
                        ) : !data || data.length === 0 ? (
                            <Grid item xs={12}>
                                <Paper elevation={0} sx={{ p: 6, textAlign: "center", bgcolor: "transparent", border: "2px dashed", borderColor: "divider", borderRadius: 4 }}>
                                    <Typography variant="h6" color="textSecondary" fontWeight="medium">
                                        Aucun test trouvé.
                                    </Typography>
                                </Paper>
                            </Grid>
                        ) : (
                            data.map((item) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
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
                                            "&:hover": { transform: "translateY(-4px)", boxShadow: theme.shadows[10] },
                                        }}
                                    >
                                        <CardActionArea onClick={() => handleOpen(item)} sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                                            <Box
                                                sx={{
                                                    height: 140,
                                                    bgcolor: "grey.100",
                                                    position: "relative",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderBottom: "1px solid",
                                                    borderColor: "divider",
                                                }}
                                            >
                                                {item.status === "error" ? (
                                                    <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main", opacity: 0.5 }} />
                                                ) : (
                                                    <EmailIcon sx={{ fontSize: 60, color: "grey.300" }} />
                                                )}
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        bottom: 8,
                                                        left: 8,
                                                        bgcolor: "common.white",
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        fontSize: "0.75rem",
                                                        fontWeight: "bold",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 0.5,
                                                        color: "text.secondary",
                                                        boxShadow: 1,
                                                    }}
                                                >
                                                    {item.status === 'sent' ? (
                                                        <><CheckCircleOutlineIcon sx={{ fontSize: 14, color: "success.main" }} /> ENVOYÉ</>
                                                    ) : item.status === 'error' ? (
                                                        <><ErrorOutlineIcon sx={{ fontSize: 14, color: "error.main" }} /> ERREUR</>
                                                    ) : (
                                                        <><HistoryIcon sx={{ fontSize: 14, color: "warning.main" }} /> EN ATTENTE</>
                                                    )}
                                                </Box>
                                            </Box>

                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold" noWrap gutterBottom>
                                                    {item.object || "Sans objet"}
                                                </Typography>
                                                <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }} noWrap>
                                                    À: {item.to}
                                                </Typography>
                                                <Divider sx={{ my: 1.5 }} />
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Typography variant="caption" color="textSecondary">
                                                        {item.mailAccount?.emailNickname || "Compte supprimé"}
                                                    </Typography>
                                                    <Typography variant="caption" color="textSecondary">
                                                        {dayjs(item.createdAt).format("DD/MM/YY HH:mm")}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>

            <Modal
                open={!!openModalItem}
                onClose={handleClose}
                aria-labelledby="modal-title"
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <Typography id="modal-title" variant="h5" fontWeight="bold">
                            {openModalItem?.object || "Sans objet"}
                        </Typography>
                        <Chip
                            label={openModalItem?.status === 'sent' ? 'Envoyé' : openModalItem?.status === 'error' ? 'Erreur' : 'En attente'}
                            color={openModalItem?.status === 'sent' ? 'success' : openModalItem?.status === 'error' ? 'error' : 'warning'}
                        />
                    </Box>

                    <Box sx={{ mb: 3, display: 'flex', gap: 4 }}>
                        <Box>
                            <Typography variant="caption" color="textSecondary" display="block">De</Typography>
                            <Typography variant="body2" fontWeight="bold">{openModalItem?.mailAccount?.email || "Inconnu"}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="textSecondary" display="block">À</Typography>
                            <Typography variant="body2" fontWeight="bold">{openModalItem?.to}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="textSecondary" display="block">Date</Typography>
                            <Typography variant="body2" fontWeight="bold">{dayjs(openModalItem?.createdAt).format("DD/MM/YYYY HH:mm")}</Typography>
                        </Box>
                    </Box>

                    <Typography variant="h6" fontWeight="bold" mb={1}>
                        Contenu du message
                    </Typography>
                    <Box
                        sx={{
                            bgcolor: "grey.50",
                            p: 3,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            mb: 4,
                            maxHeight: "35vh",
                            overflow: 'auto'
                        }}
                    >
                        <Typography dangerouslySetInnerHTML={{ __html: openModalItem?.content }}></Typography>
                    </Box>

                    <Typography variant="h6" fontWeight="bold" mb={1}>
                        Informations techniques (Réponse serveur)
                    </Typography>
                    <Box
                        sx={{
                            bgcolor: "#2d3436",
                            color: "#dfe6e9",
                            p: 3,
                            borderRadius: 3,
                            fontFamily: "monospace",
                            fontSize: "0.875rem",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all"
                        }}
                    >
                        {openModalItem?.response || "Aucune réponse enregistrée"}
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default TestMailHistory;
