import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
};

const DuplicatesModal = ({ open, onClose, onConfirm, isLoading }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="duplicates-modal-title">
            <Box sx={style}>
                <WarningAmberIcon sx={{ fontSize: 60, color: "warning.main", mb: 2 }} />
                <Typography id="duplicates-modal-title" variant="h6" fontWeight="bold" gutterBottom>
                    Supprimer les doublons ?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Des doublons ont été détectés dans cette liste. Voulez-vous les supprimer ? Seul le premier élément (ou celui ayant le statut 'envoyé') sera conservé.
                </Typography>
                <Stack direction="row" spacing={2} width="100%">
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={onClose}
                        fullWidth
                        disabled={isLoading}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onConfirm}
                        fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? "Suppression..." : "Supprimer"}
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default DuplicatesModal;
