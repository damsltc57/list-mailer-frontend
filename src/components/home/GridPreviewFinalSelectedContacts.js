import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollaborators, getSelectedContacts, removeSelectedContact } from "../../store/reducers/contactSlice";
import { Typography, Button, Paper, Box, CircularProgress, Alert } from "@mui/material";
import { useGetContactByIdsQuery } from "../../store/api/contact";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const GridPreviewFinalSelectedContacts = () => {
	const selectedContacts = useSelector(getSelectedContacts);
	const dispatch = useDispatch();
	const selectedCollaborators = useSelector(getCollaborators);

	const removeItem = (contact) => {
		dispatch(removeSelectedContact(contact));
	};

	const { data, isLoading, isFetching, isError, error } = useGetContactByIdsQuery({
		ids: selectedContacts,
	});

	const leafColumns = [
		{ field: "companyName", headerName: "Société", width: 180 },
		{ field: "firstName", headerName: "Prénom", width: 140 },
		{ field: "lastName", headerName: "Nom", width: 160 },
		{ field: "country", headerName: "Pays", width: 120 },
		{
			field: "emailSendTo",
			headerName: "Emails sélectionnés",
			width: 300,
			renderCell: (params) => {
				if (!selectedCollaborators?.[params.row.id]?.collaborators?.length) {
					return <strong>Email par défaut sélectionné</strong>;
				}
				return (
					<strong>
						{selectedCollaborators?.[params.row.id]?.collaborators?.map((item) => item.email).join(", ")}
					</strong>
				);
			},
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 120,
			sortable: false,
			renderCell: (params) => {
				return (
					<Button
						color="error"
						size="small"
						onClick={() => removeItem(params.row)}
						startIcon={<DeleteIcon />}
					>
						Retirer
					</Button>
				);
			},
		},
	];

	return (
		<Paper sx={{ height: "auto", width: "100%", marginTop: 2 }}>
			<Box sx={{ height: "60vh" }}>
				{(isLoading || isFetching) && (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							height: "100%",
							gap: 1,
						}}
					>
						<CircularProgress size={28} />
						<Typography variant="body2">Chargement des contacts...</Typography>
					</Box>
				)}
				{isError && (
					<Box sx={{ p: 2 }}>
						<Alert severity="error">Erreur lors du chargement des contacts</Alert>
						<Box
							component="pre"
							sx={{
								mt: 1,
								mb: 0,
								p: 1.5,
								borderRadius: 1,
								backgroundColor: "#f7f7f7",
								overflow: "auto",
								fontSize: "0.75rem",
							}}
						>
							{JSON.stringify(error, null, 2)}
						</Box>
					</Box>
				)}
				{!isError && (
					<DataGrid
						rows={data || []}
						columns={leafColumns}
						disableRowSelectionOnClick
						hideFooterSelectedRowCount
						loading={isLoading || isFetching}
						slotProps={{
							toolbar: {
								showQuickFilter: true,
								quickFilterProps: { debounceMs: 250 },
							},
						}}
						sx={{ height: "100%" }}
					/>
				)}
			</Box>
		</Paper>
	);
};

export default GridPreviewFinalSelectedContacts;
