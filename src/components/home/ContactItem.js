// ContactsDataGrid.jsx (JS)
import React from "react";
import { Box, Button, Stack, Paper, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SelectCollaborators from "./modal/SelectCollaborators";
import { useDispatch, useSelector } from "react-redux";
import { getCollaborators, getSelectedContacts, setSelectedContacts } from "../../store/reducers/contactSlice";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function ContactsDataGrid({ contacts }) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [selectedContact, setSelectedContact] = React.useState(null);
	const selectedCollaborators = useSelector(getCollaborators);
	const selectedContacts = useSelector(getSelectedContacts);
	const dispatch = useDispatch();

	const leafColumns = [
		{ field: "companyName", headerName: "Company", width: 180 },
		{ field: "firstName", headerName: "First name", width: 140 },
		{ field: "lastName", headerName: "Last name", width: 160 },
		{ field: "country", headerName: "Country", width: 120 },
		{ field: "email", headerName: "Email", width: 240 },
		{
			field: "emailSendTo",
			headerName: "Emails séléctionnés",
			width: 300,
			renderCell: (params) => {
				if (!params.row?.collaborators?.length) return null;
				return (
					<strong>
						<Button
							onClick={() => setSelectedContact(params.row)}
							variant="contained"
							size="small"
							style={{ marginRight: 10 }}
							tabIndex={params.hasFocus ? 0 : -1}
						>
							+
						</Button>
						{selectedCollaborators?.[params.row.id]?.collaborators?.map((item) => item.email).join(", ")}
					</strong>
				);
			},
		},
		{
			field: "collaborators",
			headerName: "Tous les emails",
			width: 240,
			renderCell: (params) => {
				return <strong>{params.row.collaborators?.map((item) => item.email).join(", ")}</strong>;
			},
		},
	];

	const columns = [
		{ ...leafColumns[0] }, // companyName
		{ ...leafColumns[3] }, // country
		{ ...leafColumns[1] }, // firstName
		{ ...leafColumns[2] }, // lastName
		{ ...leafColumns[4] }, // email
		{ ...leafColumns[5] }, // email
		{ ...leafColumns[6] }, // email
	];

	const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
		companyName: true,
		country: true,
		firstName: true,
		lastName: true,
		email: true,
		nameGroup: false,
		contactGroup: false,
	});

	return (
		<>
			<Paper sx={{ height: "auto", width: "100%", marginTop: 2 }}>
				<Box sx={{ height: "60vh" }}>
					<DataGrid
						rows={contacts}
						columns={columns}
						disableRowSelectionOnClick
						checkboxSelection
						keepNonExistentRowsSelected
						onRowSelectionModelChange={(params, add) => {
							dispatch(setSelectedContacts(params));
						}}
						rowSelectionModel={selectedContacts}
						slotProps={{
							toolbar: {
								showQuickFilter: true,
								quickFilterProps: { debounceMs: 250 },
							},
						}}
						columnVisibilityModel={columnVisibilityModel}
						onColumnVisibilityModelChange={setColumnVisibilityModel}
					/>
				</Box>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Text in a modal
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
						</Typography>
					</Box>
				</Modal>
			</Paper>

			<SelectCollaborators contact={selectedContact} setSelectedContact={setSelectedContact} />
		</>
	);
}
