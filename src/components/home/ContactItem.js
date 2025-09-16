// ContactsDataGrid.jsx (JS)
import React from "react";
import { Box, Button, Stack, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function ContactsDataGrid({ contacts }) {
	// Colonnes feuilles
	const leafColumns = [
		{ field: "companyName", headerName: "Company", width: 180 },
		{ field: "firstName", headerName: "First name", width: 140 },
		{ field: "lastName", headerName: "Last name", width: 160 },
		{ field: "country", headerName: "Country", width: 120 },
		{ field: "email", headerName: "Email", width: 240 },
	];

	// Colonnes synthétiques (quand le groupe est replié)
	const nameGroupColumn = {
		field: "nameGroup",
		headerName: "Name",
		width: 220,
		valueGetter: (params) =>
			`${params.row.firstName ?? ""} ${params.row.lastName ?? ""}`.trim(),
		sortComparator: (v1, v2, p1, p2) =>
			`${p1.row.lastName ?? ""} ${p1.row.firstName ?? ""}`.localeCompare(
				`${p2.row.lastName ?? ""} ${p2.row.firstName ?? ""}`
			),
	};

	const contactGroupColumn = {
		field: "contactGroup",
		headerName: "Contact",
		width: 260,
		valueGetter: (p) => p.row.email,
	};

	// Ordre d’affichage
	const columns = [
		{ ...leafColumns[0] }, // companyName
		nameGroupColumn,       // groupe Name (synthétique)
		{ ...leafColumns[3] }, // country
		contactGroupColumn,    // groupe Contact (synthétique)
		{ ...leafColumns[1] }, // firstName
		{ ...leafColumns[2] }, // lastName
		{ ...leafColumns[4] }, // email
	];

	// Visibilité par défaut : groupes ouverts (enfants visibles, colonnes groupe masquées)
	const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
		companyName: true,
		country: true,
		firstName: true,
		lastName: true,
		email: true,
		nameGroup: false,
		contactGroup: false,
	});

	// Bascule repli/dépli
	const toggleGroup = React.useCallback((group) => {
		setColumnVisibilityModel((prev) => {
			const next = { ...prev };
			if (group === "name") {
				const collapsed = !prev.nameGroup;
				next.nameGroup = collapsed;
				next.firstName = !collapsed;
				next.lastName = !collapsed;
			} else if (group === "contact") {
				const collapsed = !prev.contactGroup;
				next.contactGroup = collapsed;
				next.email = !collapsed;
			}
			return next;
		});
	}, []);

	return (
		<Paper sx={{ height: 520, width: "100%" }}>
			{/*<Stack direction="row" spacing={1} sx={{ p: 1 }}>*/}
			{/*	<Button size="small" onClick={() => toggleGroup("name")}>*/}
			{/*		Replier/Déplier “Name”*/}
			{/*	</Button>*/}
			{/*	<Button size="small" onClick={() => toggleGroup("contact")}>*/}
			{/*		Replier/Déplier “Contact”*/}
			{/*	</Button>*/}
			{/*</Stack>*/}

			<Box sx={{ height: "calc(520px - 48px)" }}>
				<DataGrid
					rows={contacts}
					columns={columns}
					disableRowSelectionOnClick
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
		</Paper>
	);
}
