import React, { useState } from "react";
import { useGetHistoryStatsQuery, useGetInProgressHistoryQuery, useGetBatchInfoQuery } from "../store/api/history";
import StatusEmailsModal from "../components/statistics/StatusEmailsModal";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Collapse,
    Divider,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Grid,
    Avatar,
    useTheme,
    Button,
    IconButton,
    LinearProgress,
} from "@mui/material";
import dayjs from "dayjs";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SpeedIcon from "@mui/icons-material/Speed";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";

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

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow
                sx={{ "& > *": { borderBottom: "unset" }, cursor: !!row.error ? "pointer" : "auto" }}
                onClick={() => !!row.error && setOpen(!open)}
            >
                <TableCell align={"center"}>
                    {!!row.error && <ErrorOutlineIcon color={"error"} />}
                </TableCell>

                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="right">{row?.status}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" color="error">
                                Erreur: {row?.error}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

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
                    TABLEAU DE BORD
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1, mb: 3, maxWidth: "70%" }}>
                    Suivi des performances de vos campagnes E-Mail
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: "80%", lineHeight: 1.6 }}>
                    Visualisez l'état d'avancement, la délivrabilité et les performances globales de vos différentes campagnes d'emailing en temps réel.
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

const HeaderStatChip = ({ icon, title, value, color, onClick, subtitle }) => (
    <Paper
        elevation={0}
        onClick={onClick}
        sx={{
            p: 2,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            border: "1px solid",
            borderColor: "divider",
            minWidth: 200,
            cursor: onClick ? "pointer" : "default",
            transition: "transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
            "&:hover": onClick
                ? {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }
                : {},
        }}
    >
        <Box
            sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: `${color}.light`,
                color: `${color}.main`,
            }}
        >
            {icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="textSecondary" fontWeight="medium">
                {title}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
                {value}
            </Typography>
            {subtitle && (
                <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: "block" }}>
                    {subtitle}
                </Typography>
            )}
        </Box>
        <IconButton size="small">
            <MoreVertIcon fontSize="small" />
        </IconButton>
    </Paper>
);

const SectionHeader = ({ title, onPrev, onNext, showArrows = true }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
            {title}
        </Typography>
        {showArrows && (
            <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton size="small" sx={{ border: "1px solid", borderColor: "divider" }} onClick={onPrev}>
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton size="small" sx={{ bgcolor: "#6c5ce7", color: "white", "&:hover": { bgcolor: "#5b4bc4" } }} onClick={onNext}>
                    <ChevronRightIcon />
                </IconButton>
            </Box>
        )}
    </Box>
);

const RightSidebar = ({ statsData, startDate, endDate, setStartDate, setEndDate }) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 4,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                    Statistiques Globales
                </Typography>
                <IconButton size="small">
                    <MoreVertIcon />
                </IconButton>
            </Box>

            {/* Circular Progress Area */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Box
                    sx={{
                        position: "relative",
                        width: 140,
                        height: 140,
                        border: `8px solid ${theme.palette.divider}`,
                        borderTopColor: "#6c5ce7",
                        borderRightColor: "#6c5ce7",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                    }}
                >
                    <Avatar sx={{ width: 80, height: 80, bgcolor: "grey.200", color: "text.secondary" }}>
                        <EmailIcon fontSize="large" />
                    </Avatar>
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: -10,
                            bgcolor: "#6c5ce7",
                            color: "white",
                            px: 1,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                        }}
                    >
                        Total {statsData?.completed || 0}
                    </Box>
                </Box>
                <Typography variant="h6" fontWeight="bold">
                    Campagnes Terminées 🔥
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Filtrez par période ci-dessous pour plus de détails.
                </Typography>
            </Box>

            {/* Date Filters Area */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Du"
                    type="date"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "grey.50",
                        },
                    }}
                />
                <TextField
                    label="Au"
                    type="date"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "grey.50",
                        },
                    }}
                />
            </Box>

            <Divider />

            {/* Performance Metrics */}
            <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Vitesse d'envoi
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {[
                        { label: "Par minute", value: "0.5", total: 1 },
                        { label: "Par heure", value: "30", total: 60 },
                        { label: "Par jour", value: "720", total: 1440 },
                    ].map((item, index) => (
                        <Box key={index}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                <Typography variant="body2" fontWeight="medium">
                                    {item.label}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" fontWeight="bold">
                                    {item.value}
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={(parseFloat(item.value) / item.total) * 100}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: "grey.100",
                                    "& .MuiLinearProgress-bar": {
                                        bgcolor: "#6c5ce7",
                                        borderRadius: 4,
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </Box>

                <Typography variant="caption" color="textSecondary" sx={{ mt: 3, display: "block", textAlign: "center", bgcolor: "grey.50", p: 1, borderRadius: 2, border: "1px dashed", borderColor: "divider" }}>
                    Rythme : <strong>5 emails</strong> envoyés toutes les <strong>10 minutes</strong>.
                </Typography>
            </Box>
        </Paper>
    );
};

const Statistics = () => {
    const theme = useTheme();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [openModalItem, setOpenModalItem] = useState(null);
    const [statusModal, setStatusModal] = useState(null);

    const { data: statsData } = useGetHistoryStatsQuery({ startDate, endDate });
    const { data: inProgressData } = useGetInProgressHistoryQuery();
    const { data: infos } = useGetBatchInfoQuery({ batchId: openModalItem?.id }, { skip: !openModalItem });

    const handleOpen = (email) => setOpenModalItem(email);
    const handleClose = () => setOpenModalItem(null);

    const pendingCount = statsData?.pendingEmails || 0;
    const remainingTotalMinutes = Math.ceil((pendingCount / 5) * 10);
    const remainingHours = Math.floor(remainingTotalMinutes / 60);
    const remainingMins = remainingTotalMinutes % 60;

    let pendingLabel = "Aucune attente";
    if (pendingCount > 0) {
        let timeStr = "";
        if (remainingHours > 0) timeStr += `${remainingHours}h `;
        if (remainingMins > 0) timeStr += `${remainingMins}m `;
        if (timeStr === "") timeStr = "< 1m ";
        pendingLabel = `~${timeStr.trim()} restant(s)`;
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: theme.palette.mode === "dark" ? "background.default" : "#f8f9fc", minHeight: "100vh" }}>
            <Grid container spacing={4}>
                {/* Main Content Area */}
                <Grid item xs={12} lg={8} xl={9}>
                    <Banner />

                    <SectionHeader title="Statistiques des Campagnes" showArrows={false} />
                    <Box sx={{ display: "flex", gap: 3, mb: 4, overflowX: "auto", pb: 1 }}>
                        <HeaderStatChip
                            title="Envois en cours"
                            value={statsData?.inProgress || 0}
                            icon={<AutorenewIcon />}
                            color="warning"
                        />
                        <HeaderStatChip
                            title="Campagnes totales"
                            value={statsData?.completed || 0}
                            icon={<CheckCircleOutlineIcon />}
                            color="success"
                        />
                        <HeaderStatChip
                            title="Estim. Journalière"
                            value="720 emails"
                            icon={<SpeedIcon />}
                            color="info"
                        />
                    </Box>

                    <SectionHeader title="Statistiques des E-mails" showArrows={false} />
                    <Box sx={{ display: "flex", gap: 3, mb: 5, overflowX: "auto", pb: 1 }}>
                        <HeaderStatChip
                            title="Emails Totaux"
                            value={statsData?.totalEmails || 0}
                            icon={<EmailIcon />}
                            color="primary"
                        />
                        <HeaderStatChip
                            title="Emails Envoyés"
                            value={statsData?.sentEmails || 0}
                            icon={<CheckCircleOutlineIcon />}
                            color="success"
                            onClick={() => setStatusModal("sent")}
                        />
                        <HeaderStatChip
                            title="En Attente"
                            value={statsData?.pendingEmails || 0}
                            subtitle={pendingLabel}
                            icon={<AutorenewIcon />}
                            color="warning"
                            onClick={() => setStatusModal("pending")}
                        />
                        <HeaderStatChip
                            title="En Erreur"
                            value={statsData?.errorEmails || 0}
                            icon={<ErrorOutlineIcon />}
                            color="error"
                            onClick={() => setStatusModal("error")}
                        />
                    </Box>

                    <SectionHeader title="Campagnes en cours" showArrows={true} />

                    <Grid container spacing={3}>
                        {inProgressData?.length === 0 ? (
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
                                        Aucune campagne en cours de traitement pour le moment.
                                    </Typography>
                                </Paper>
                            </Grid>
                        ) : (
                            inProgressData?.map((mail) => (
                                <Grid item xs={12} sm={6} md={4} key={mail.id}>
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
                                        <CardActionArea onClick={() => handleOpen(mail)} sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                                            {/* Pseudo Image Area */}
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
                                                <EmailIcon sx={{ fontSize: 60, color: "grey.300" }} />
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
                                                        color: "warning.main",
                                                        boxShadow: 1,
                                                    }}
                                                >
                                                    <AutorenewIcon sx={{ fontSize: 14, animation: "spin 2s linear infinite" }} /> EN COURS
                                                </Box>
                                            </Box>

                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold" noWrap gutterBottom>
                                                    {mail.object}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    variant="body2"
                                                    dangerouslySetInnerHTML={{ __html: mail?.content }}
                                                    sx={{
                                                        overflow: "hidden",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        mb: 2,
                                                        minHeight: "3em",
                                                    }}
                                                />
                                                <Divider sx={{ my: 1.5 }} />
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <Avatar sx={{ width: 24, height: 24, fontSize: "0.75rem", bgcolor: "#6c5ce7" }}>
                                                            MC
                                                        </Avatar>
                                                        <Typography variant="caption" fontWeight="medium">
                                                            Campagne
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="caption" color="textSecondary">
                                                        {dayjs(mail?.createdAt).format("DD/MM/YYYY")}
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

                {/* Right Sidebar Area */}
                <Grid item xs={12} lg={4} xl={3}>
                    <RightSidebar
                        statsData={statsData}
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </Grid>
            </Grid>

            {/* Modal for detail view */}
            <Modal
                open={!!openModalItem}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <Typography id="modal-title" variant="h5" fontWeight="bold">
                            {openModalItem?.object}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            bgcolor: "grey.50",
                            p: 3,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            mb: 4,
                        }}
                    >
                        <Typography
                            id="modal-description"
                            dangerouslySetInnerHTML={{ __html: openModalItem?.content }}
                        ></Typography>
                    </Box>

                    <Typography variant="h6" fontWeight="bold" mb={1}>
                        Progression de l'envoi
                    </Typography>
                    <Typography color="textSecondary" variant="body2" mb={3}>
                        Campagne du {dayjs(openModalItem?.createdAt).format("DD/MM/YYYY HH:mm")} envoyée à{" "}
                        <strong>{infos?.list?.length || 0}</strong> destinataire(s) via{" "}
                        <Box component="span" sx={{ bgcolor: "#e0e7ff", color: "#4338ca", px: 1, py: 0.5, borderRadius: 1, fontWeight: "medium" }}>
                            {infos?.mailAccount?.email || "chargement..."}
                        </Box>
                    </Typography>

                    {/* Custom Progress Bar matching the style */}
                    <Box sx={{ mb: 4, bgcolor: "grey.100", p: 2, borderRadius: 2 }}>
                        <Box sx={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", mb: 2 }}>
                            <Box sx={{ width: `${((infos?.sent || 0) / Math.max(infos?.list?.length || 1, 1)) * 100}%`, bgcolor: theme.palette.statColors.Envoyé, transition: "width 0.5s" }} />
                            <Box sx={{ width: `${((infos?.pending || 0) / Math.max(infos?.list?.length || 1, 1)) * 100}%`, bgcolor: theme.palette.statColors.Attente, transition: "width 0.5s" }} />
                            <Box sx={{ width: `${((infos?.error || 0) / Math.max(infos?.list?.length || 1, 1)) * 100}%`, bgcolor: theme.palette.statColors.Erreur, transition: "width 0.5s" }} />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: theme.palette.statColors.Envoyé }} />
                                <Typography variant="body2">Envoyé ({infos?.sent || 0})</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: theme.palette.statColors.Attente }} />
                                <Typography variant="body2">En attente ({infos?.pending || 0})</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: theme.palette.statColors.Erreur }} />
                                <Typography variant="body2">Erreur ({infos?.error || 0})</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Typography variant="h6" fontWeight="bold" mb={2}>
                        Liste des destinataires
                    </Typography>

                    <Box
                        sx={{
                            overflow: "auto",
                            maxHeight: "35vh",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                        }}
                    >
                        <TableContainer component={Paper} elevation={0}>
                            <Table stickyHeader sx={{ minWidth: 200 }} aria-label="destinataires table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="50px" sx={{ bgcolor: "grey.50" }} />
                                        <TableCell align="left" sx={{ fontWeight: "bold", bgcolor: "grey.50" }}>
                                            Email
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontWeight: "bold", bgcolor: "grey.50" }}>
                                            Statut
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {infos?.list?.length > 0 ? (
                                        infos.list.map((row) => <Row key={row.email || row.id} row={row} />)
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center" sx={{ py: 4, color: "text.secondary" }}>
                                                Chargement des données...
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Modal>

            <StatusEmailsModal
                open={!!statusModal}
                handleClose={() => setStatusModal(null)}
                statusParam={statusModal}
            />

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

export default Statistics;
