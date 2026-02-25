import React from "react";
import {
    Box,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
    CircularProgress,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useGetEmailsByStatusQuery } from "../../store/api/history";

const modalStyle = {
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

const titleMap = {
    pending: "Emails en Attente",
    sent: "Emails Envoyés",
    error: "Emails en Erreur",
};

const StatusEmailsModal = ({ open, handleClose, statusParam }) => {
    const theme = useTheme();

    // Only fetch when the modal is open and we have a valid statusParam
    const { data: emails, isLoading, isFetching } = useGetEmailsByStatusQuery(
        { status: statusParam },
        { skip: !open || !statusParam }
    );

    const title = statusParam ? titleMap[statusParam] || `Liste des contacts (${statusParam})` : "Détails";

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="status-modal-title"
            aria-describedby="status-modal-description"
        >
            <Box sx={modalStyle}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography id="status-modal-title" variant="h5" fontWeight="bold">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {emails?.length || 0} résultat(s)
                    </Typography>
                </Box>

                <Box
                    sx={{
                        overflow: "auto",
                        maxHeight: "65vh",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                    }}
                >
                    <TableContainer component={Paper} elevation={0}>
                        <Table stickyHeader sx={{ minWidth: 200 }} aria-label="emails by status table">
                            <TableHead>
                                <TableRow>
                                    {statusParam === "error" && (
                                        <TableCell width="50px" sx={{ bgcolor: "grey.50" }} />
                                    )}
                                    <TableCell align="left" sx={{ fontWeight: "bold", bgcolor: "grey.50" }}>
                                        Email
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: "bold", bgcolor: "grey.50" }}>
                                        Statut
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading || isFetching ? (
                                    <TableRow>
                                        <TableCell colSpan={statusParam === "error" ? 3 : 2} align="center" sx={{ py: 6 }}>
                                            <CircularProgress size={30} sx={{ color: theme.palette.primary.main }} />
                                            <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                                                Chargement des listes de contacts...
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : emails && emails.length > 0 ? (
                                    emails.map((row) => (
                                        <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            {statusParam === "error" && (
                                                <TableCell align="center">
                                                    <ErrorOutlineIcon color="error" />
                                                </TableCell>
                                            )}
                                            <TableCell align="left">
                                                <Typography variant="body2">{row.email}</Typography>
                                                {statusParam === "error" && row.error && (
                                                    <Typography variant="caption" color="error" display="block">
                                                        {row.error}
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        bgcolor:
                                                            row.status === "sent"
                                                                ? theme.palette.statColors?.Envoyé || "success.light"
                                                                : row.status === "pending"
                                                                    ? theme.palette.statColors?.Attente || "warning.light"
                                                                    : theme.palette.statColors?.Erreur || "error.light",
                                                        color:
                                                            row.status === "sent"
                                                                ? "success.dark"
                                                                : row.status === "pending"
                                                                    ? "warning.dark"
                                                                    : "error.dark",
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        fontWeight: "bold",
                                                        textTransform: "uppercase",
                                                    }}
                                                >
                                                    {row.status}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={statusParam === "error" ? 3 : 2} align="center" sx={{ py: 4, color: "text.secondary" }}>
                                            Aucun email trouvé pour ce statut.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Modal>
    );
};

export default StatusEmailsModal;
