import React, { useState, useEffect, useRef } from "react";
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
    Checkbox,
    Button,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import dayjs from "dayjs";
import { useGetEmailsByStatusQuery, useRequeueContactsMutation, historyApi } from "../../store/api/history";
import { useDispatch } from "react-redux";

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
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const scrollContainerRef = useRef(null);
    const [requeueContacts, { isLoading: isRequeueing }] = useRequeueContactsMutation();

    // Reset state when modal opens/changes status
    useEffect(() => {
        if (open) {
            setPage(1);
            setSelectedIds([]);
        }
    }, [open, statusParam]);

    // Only fetch when the modal is open and we have a valid statusParam
    const { data, isLoading, isFetching } = useGetEmailsByStatusQuery(
        { status: statusParam, page, limit: 500 },
        { skip: !open || !statusParam }
    );

    const emails = data?.data || [];
    const total = data?.total || 0;

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && emails.length < total && !isFetching) {
            setPage((prev) => prev + 1);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = emails.map((n) => n.id);
            // Append missing ones
            const uniqueSelections = Array.from(new Set([...selectedIds, ...newSelecteds]));
            setSelectedIds(uniqueSelections);
            return;
        }

        // If unchecking "Select All", remove current page visible items from selected pool
        const currentPageIds = emails.map((n) => n.id);
        const filtered = selectedIds.filter(id => !currentPageIds.includes(id));
        setSelectedIds(filtered);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selectedIds.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedIds, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedIds.slice(1));
        } else if (selectedIndex === selectedIds.length - 1) {
            newSelected = newSelected.concat(selectedIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedIds.slice(0, selectedIndex),
                selectedIds.slice(selectedIndex + 1),
            );
        }

        setSelectedIds(newSelected);
    };

    const handleRequeueConfirm = async () => {
        try {
            await requeueContacts({ ids: selectedIds }).unwrap();
            setSelectedIds([]);
            setPage(1); // Refresh data
            // Trigger hard refetch
            dispatch(historyApi.util.invalidateTags([{ type: 'TestMailHistory' }]));
            setConfirmModalOpen(false);
        } catch (error) {
            console.error("Failed to requeue", error);
        }
    };

    const isSelected = (id) => selectedIds.indexOf(id) !== -1;
    // We only care about checking/unchecking for current page length since emails represents accumulated page data
    const allCurrentPageSelected = emails.length > 0 && emails.every(item => selectedIds.includes(item.id));
    const someCurrentPageSelected = emails.length > 0 && emails.some(item => selectedIds.includes(item.id)) && !allCurrentPageSelected;

    const title = statusParam ? titleMap[statusParam] || `Liste des contacts (${statusParam})` : "Détails";

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="status-modal-title"
                aria-describedby="status-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Typography id="status-modal-title" variant="h5" fontWeight="bold">
                                {title}
                            </Typography>
                            {statusParam === "error" && selectedIds.length > 0 && (
                                <Button
                                    variant="contained"
                                    color="warning"
                                    size="small"
                                    onClick={() => setConfirmModalOpen(true)}
                                >
                                    Remettre en attente ({selectedIds.length})
                                </Button>
                            )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {total} résultat(s)
                        </Typography>
                    </Box>

                    <Box
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
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
                                            <TableCell padding="checkbox" sx={{ bgcolor: "grey.50" }}>
                                                <Checkbox
                                                    color="primary"
                                                    indeterminate={someCurrentPageSelected}
                                                    checked={allCurrentPageSelected}
                                                    onChange={handleSelectAllClick}
                                                    inputProps={{ 'aria-label': 'select all emails' }}
                                                />
                                            </TableCell>
                                        )}
                                        {statusParam === "error" && (
                                            <TableCell width="50px" sx={{ bgcolor: "grey.50" }} />
                                        )}
                                        <TableCell align="left" sx={{ fontWeight: "bold", bgcolor: "grey.50" }}>
                                            Email
                                        </TableCell>
                                        <TableCell align="left" sx={{ fontWeight: "bold", bgcolor: "grey.50" }}>
                                            Date
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
                                        emails.map((row) => {
                                            const isItemSelected = isSelected(row.id);
                                            return (
                                                <TableRow
                                                    key={row.id}
                                                    hover
                                                    onClick={(event) => {
                                                        if (statusParam === "error") handleClick(event, row.id);
                                                    }}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    selected={isItemSelected}
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: statusParam === "error" ? "pointer" : "default" }}
                                                >
                                                    {statusParam === "error" && (
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                color="primary"
                                                                checked={isItemSelected}
                                                                inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${row.id}` }}
                                                            />
                                                        </TableCell>
                                                    )}
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
                                                    <TableCell align="left">
                                                        <Typography variant="body2" color="textSecondary">
                                                            {row.updatedAt ? dayjs(row.updatedAt).format("DD/MM/YYYY HH:mm") : "-"}
                                                        </Typography>
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
                                            );
                                        })
                                    ) : null}
                                    {isFetching && emails?.length > 0 && (
                                        <TableRow>
                                            <TableCell colSpan={statusParam === "error" ? 4 : 3} align="center" sx={{ py: 2 }}>
                                                <CircularProgress size={20} sx={{ color: theme.palette.primary.main }} />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {!isLoading && !isFetching && (!emails || emails.length === 0) && (
                                        <TableRow>
                                            <TableCell colSpan={statusParam === "error" ? 4 : 3} align="center" sx={{ py: 4, color: "text.secondary" }}>
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

            {/* Confirmation Modal - Rendered outside the main Modal to prevent nested z-index/transition bugs */}
            <Modal
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
            >
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                        Remettre en attente ({selectedIds.length} contact{selectedIds.length > 1 ? "s" : ""})
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={3}>
                        Vous êtes sur le point de réinitialiser le statut de ces emails afin qu'ils soient de nouveau expédiés lors du prochain envoi de masse. Confirmer ?
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                        <Button variant="text" onClick={() => setConfirmModalOpen(false)}>Annuler</Button>
                        <Button
                            variant="contained"
                            color="warning"
                            disabled={isRequeueing}
                            onClick={handleRequeueConfirm}
                        >
                            {isRequeueing ? <CircularProgress size={24} /> : "Confirmer la remise en attente"}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default StatusEmailsModal;
