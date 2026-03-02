import React from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Paper,
    Typography,
    useTheme,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ScienceIcon from "@mui/icons-material/Science";
import HistoryIcon from "@mui/icons-material/History";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PendingIcon from "@mui/icons-material/Pending";
import EmailIcon from "@mui/icons-material/Email";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { useGetAllHistoryQuery, useGetHistoryStatsQuery, useGetInProgressHistoryQuery } from "../store/api/history";
import { useGetGlobalSettingsQuery } from "../store/api/settings";

const getStatusDisplay = (status) => {
    switch (status) {
        case "EN ATTENTE":
            return {
                icon: <PendingIcon sx={{ fontSize: 14, color: "warning.main" }} />,
                text: "EN ATTENTE",
                color: "warning.main",
            };
        case "EN COURS":
            return {
                icon: <AutorenewIcon sx={{ fontSize: 14, color: "info.main", animation: "spin 2s linear infinite" }} />,
                text: "EN COURS",
                color: "info.main",
            };
        case "ARCHIVÉE":
        default:
            return {
                icon: <CheckCircleOutlineIcon sx={{ fontSize: 14, color: "success.main" }} />,
                text: "ARCHIVÉE",
                color: "text.secondary",
            };
    }
};

const HeaderStatChip = ({ title, value, icon, color, onClick }) => {
    const theme = useTheme();
    return (
        <Paper
            elevation={0}
            onClick={onClick}
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                cursor: onClick ? "pointer" : "default",
                transition: "all 0.2s",
                "&:hover": onClick ? {
                    boxShadow: theme.shadows[2],
                    borderColor: `${color}.main`,
                } : {},
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: -15,
                    right: -15,
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    bgcolor: `${color}.light`,
                    opacity: 0.2,
                }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 32,
                        height: 32,
                        borderRadius: 2,
                        bgcolor: `${color}.lighter`,
                        color: `${color}.main`,
                    }}
                >
                    {icon}
                </Box>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">
                    {title}
                </Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "text.primary" }}>
                {value}
            </Typography>
        </Paper>
    );
};

const Dashboard = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    // Data fetching
    const { data: globalSettings } = useGetGlobalSettingsQuery();
    const { data: statsData } = useGetHistoryStatsQuery({});
    const { data: allHistoryData } = useGetAllHistoryQuery({}, { pollingInterval: 10000 });
    const { data: inProgressData } = useGetInProgressHistoryQuery(undefined, {
        pollingInterval: 3000,
    });

    const hasGlobalDuplicates = allHistoryData?.some(campaign => campaign.hasDuplicates);

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: theme.palette.mode === "dark" ? "background.default" : "#f8f9fc", minHeight: "100vh" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 4 }}>
                <Typography variant="h3" fontWeight="bold">
                    Tableau de Bord
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Aperçu instantané de l'état du système et de vos campagnes
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* ---------- Quick Actions ---------- */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            height: "100%",
                            borderRadius: 4,
                            bgcolor: "#6c5ce7",
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            p: 3,
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: -30,
                                right: -30,
                                width: 150,
                                height: 150,
                                borderRadius: "50%",
                                bgcolor: "rgba(255, 255, 255, 0.1)",
                            }}
                        />
                        <Typography variant="h5" fontWeight="bold" mb={1} sx={{ zIndex: 1 }}>
                            Prêt à communiquer ?
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 3, zIndex: 1 }}>
                            Planifiez une annonce de masse, ou validez la configuration sur une adresse test.
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, zIndex: 1 }}>
                            <Button
                                variant="contained"
                                startIcon={<AddBoxIcon />}
                                onClick={() => navigate("/nouvelle-campagne")}
                                sx={{ bgcolor: "white", color: "#6c5ce7", "&:hover": { bgcolor: "grey.100" }, fontWeight: "bold" }}
                            >
                                Nouvelle Campagne
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<ScienceIcon />}
                                onClick={() => navigate("/test-mails/new")}
                                sx={{ color: "white", borderColor: "rgba(255, 255, 255, 0.5)", "&:hover": { borderColor: "white", bgcolor: "rgba(255, 255, 255, 0.1)" } }}
                            >
                                Tester un mail
                            </Button>
                        </Box>
                    </Card>
                </Grid>

                {/* ---------- Quick Stats ---------- */}
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} sx={{ height: "100%" }}>
                        <Grid item xs={6}>
                            <HeaderStatChip
                                title="Campagnes validées"
                                value={statsData?.completed || 0}
                                icon={<HistoryIcon />}
                                color="primary"
                                onClick={() => navigate("/statistiques")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HeaderStatChip
                                title="Emails Envoyés"
                                value={statsData?.sentEmails || 0}
                                icon={<CheckCircleOutlineIcon />}
                                color="success"
                                onClick={() => navigate("/statistiques")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HeaderStatChip
                                title="Campagnes en cours"
                                value={statsData?.inProgress || 0}
                                icon={<AutorenewIcon />}
                                color="warning"
                                onClick={() => navigate("/statistiques")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HeaderStatChip
                                title="Emails en Attente"
                                value={statsData?.pendingEmails || 0}
                                icon={<AutorenewIcon />}
                                color="warning"
                                onClick={() => navigate("/statistiques")}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* ---------- System Alerts ---------- */}
                {globalSettings?.isPaused && (
                    <Grid item xs={12}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                bgcolor: "error.light",
                                color: "error.dark",
                                border: "1px solid",
                                borderColor: "error.main",
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                boxShadow: theme.shadows[1],
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <PauseCircleOutlineIcon sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        Envois actuellement en pause
                                    </Typography>
                                    <Typography variant="body2">
                                        Le système d'envoi de masse a été suspendu manuellement. Aucune campagne ne sera expédiée pour le moment.
                                    </Typography>
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => navigate("/statistiques")}
                                sx={{ fontWeight: "bold", borderRadius: 2 }}
                            >
                                Gérer
                            </Button>
                        </Card>
                    </Grid>
                )}

                {hasGlobalDuplicates && (
                    <Grid item xs={12}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                bgcolor: "warning.light",
                                color: "warning.dark",
                                border: "1px solid",
                                borderColor: "warning.main",
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                boxShadow: theme.shadows[1],
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <WarningAmberIcon sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        Des doublons ont été détectés
                                    </Typography>
                                    <Typography variant="body2">
                                        Certaines de vos listes de destinataires récentes contiennent des e-mails en double.
                                        Ceci peut impacter vos statistiques.
                                    </Typography>
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => navigate("/historique")}
                                sx={{ fontWeight: "bold", borderRadius: 2 }}
                            >
                                Gérer dans l'historique
                            </Button>
                        </Card>
                    </Grid>
                )}

                {/* ---------- In Progress Campaigns ---------- */}
                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold" mb={2} mt={2}>
                        Activité en temps réel
                    </Typography>
                    <Grid container spacing={3}>
                        {!inProgressData || inProgressData.length === 0 ? (
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
                                        Aucune campagne en cours d'envoi.
                                    </Typography>
                                    <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate("/nouvelle-campagne")}>
                                        Commencer une campagne
                                    </Button>
                                </Paper>
                            </Grid>
                        ) : (
                            inProgressData.map((mail) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={mail.id}>
                                    <Card
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            borderRadius: 4,
                                            border: "1px solid",
                                            borderColor: "divider",
                                            boxShadow: "none",
                                            height: "100%",
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                boxShadow: theme.shadows[4],
                                            },
                                        }}
                                        onClick={() => navigate("/statistiques")} // Redirects to stats for detailed view
                                    >
                                        <CardActionArea sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                                            <Box
                                                sx={{
                                                    height: 120,
                                                    bgcolor: "grey.100",
                                                    position: "relative",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderBottom: "1px solid",
                                                    borderColor: "divider",
                                                }}
                                            >
                                                <EmailIcon sx={{ fontSize: 50, color: "grey.300" }} />
                                                {(() => {
                                                    const statusDisplay = getStatusDisplay(mail.campaignStatus || "EN COURS");
                                                    return (
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
                                                                color: statusDisplay.color,
                                                                boxShadow: 1,
                                                            }}
                                                        >
                                                            {statusDisplay.icon} {statusDisplay.text}
                                                        </Box>
                                                    );
                                                })()}
                                            </Box>
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                                    {mail.object}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                                    Cliquez pour suivre l'avancement complet
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </Box>
    );
};

export default Dashboard;
