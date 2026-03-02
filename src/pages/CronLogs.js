import React, { useState } from "react";
import { useGetCronLogsQuery } from "../store/api/cronLogs";
import {
    Box,
    Card,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Chip,
    Collapse,
    IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

function Row({ row }) {
    const [open, setOpen] = useState(false);

    let parsedDetails = [];
    try {
        if (row.details) parsedDetails = JSON.parse(row.details);
    } catch (e) {
        parsedDetails = [row.details];
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "success": return "success";
            case "warning": return "warning";
            case "error": return "error";
            default: return "default";
        }
    };

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {dayjs(row.timestamp).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell>{row.cronName}</TableCell>
                <TableCell>{row.summary}</TableCell>
                <TableCell align="right">
                    <Chip label={row.status} color={getStatusColor(row.status)} size="small" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Détails
                            </Typography>
                            {parsedDetails && parsedDetails.length > 0 ? (
                                <Box sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1 }}>
                                    {parsedDetails.map((detail, index) => (
                                        <Typography key={index} variant="body2" sx={{ fontFamily: "monospace", mb: 0.5 }}>
                                            {detail}
                                        </Typography>
                                    ))}
                                </Box>
                            ) : (
                                <Typography variant="body2" color="textSecondary">Aucun détail supplémentaire.</Typography>
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const CronLogs = () => {
    const [page, setPage] = useState(1);
    const limit = 50;

    const { data, isLoading } = useGetCronLogsQuery({ page, limit });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Logs Système
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Historique des tâches planifiées (Crons)
                </Typography>
            </Box>

            <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <TableContainer component={Paper} elevation={0}>
                    <Table aria-label="collapsible table">
                        <TableHead sx={{ bgcolor: "grey.50" }}>
                            <TableRow>
                                <TableCell width="50" />
                                <TableCell>Date & Heure</TableCell>
                                <TableCell>Nom du Cron</TableCell>
                                <TableCell>Résumé</TableCell>
                                <TableCell align="right">Statut</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                        Chargement des logs...
                                    </TableCell>
                                </TableRow>
                            ) : data?.logs?.length > 0 ? (
                                data.logs.map((row) => <Row key={row.id} row={row} />)
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                        Aucun log trouvé.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {data?.totalPages > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", p: 2, borderTop: "1px solid", borderColor: "divider" }}>
                        <Pagination
                            count={data.totalPages}
                            page={page}
                            onChange={handleChangePage}
                            color="primary"
                        />
                    </Box>
                )}
            </Card>
        </Box>
    );
};

export default CronLogs;
