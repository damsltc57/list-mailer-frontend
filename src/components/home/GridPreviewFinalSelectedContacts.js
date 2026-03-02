import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addSelectedContact,
	getCollaborators,
	getSelectedContacts,
	removeSelectedContact,
} from "../../store/reducers/contactSlice";
import { Grid, Typography, Button, Paper, Box } from "@mui/material";
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

	const { data } = useGetContactByIdsQuery({
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
				if (!params.row?.collaborators?.length) return <strong>Email par défaut sélectionné</strong>;
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
			}
		}
	];

	return (
		<Paper sx={{ height: "auto", width: "100%", marginTop: 2 }}>
			<Box sx={{ height: "60vh" }}>
				<DataGrid
					rows={data || []}
					columns={leafColumns}
					disableRowSelectionOnClick
					hideFooterSelectedRowCount
					slotProps={{
						toolbar: {
							showQuickFilter: true,
							quickFilterProps: { debounceMs: 250 },
						},
					}}
				/>
			</Box>
		</Paper>
	);
};

export default GridPreviewFinalSelectedContacts;
