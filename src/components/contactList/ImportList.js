import React from "react";
import Dialog from "@mui/material/Dialog";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Typography } from "@mui/material";
import { useGetContactListsQuery, useImportContactsMutation } from "../../store/api/contact";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import ImportListAutocomplete from "./ImportListAutocomplete";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

const ImportList = ({ open, handleClose, refetch }) => {
	const [importContacts] = useImportContactsMutation();
	const [list, setList] = React.useState(null);
	const [file, setFile] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const { data: contactList, refetch: refetchContactLists } = useGetContactListsQuery();

	const uploadFile = () => {
		setIsLoading(true);
		importContacts({ file, list }).finally(() => {
			setFile(null);
			setList(null);
			refetch();
			refetchContactLists();
			handleClose();
			setIsLoading(false);
		});
	};

	const setFileData = (files) => {
		if (files[0]) {
			setFile(files[0]);
		}
	};

	return (
		<Dialog onClose={handleClose} open={open} maxWidth={false} sx={{ padding: 5 }}>
			<DialogTitle sx={{ fontWeight: 800, fontSize: 22 }}>Importer un csv</DialogTitle>
			<Box sx={{ padding: 3, display: "flex", flexDirection: "column", gap: 4, minWidth: 400 }}>
				<ImportListAutocomplete contactList={contactList} list={list} setList={setList} />
				<Box>
					<Button
						fullWidth
						component="label"
						role={undefined}
						tabIndex={-1}
						variant="contained"
						startIcon={<CloudUploadIcon />}
					>
						Importer csv
						<VisuallyHiddenInput
							onChange={(event) => setFileData(event.target.files)}
							accept=".csv,.xlsx"
							type="file"
						/>
					</Button>
					{!!file && (
						<Box
							sx={{
								border: "1px solid #d9d9d9",
								borderTopWidth: 0,
								padding: "5px 10px",
								borderRadius: "5px",
								borderTopLeftRadius: 0,
								borderTopRightRadius: 0,
							}}
						>
							<Typography fontWeight={600} color={"#7a7a7a"} textAlign={"center"}>
								{file?.name}
							</Typography>
						</Box>
					)}
				</Box>
				<Button
					fullWidth
					component="label"
					role={undefined}
					tabIndex={-1}
					variant="contained"
					disabled={!file || !list}
					onClick={uploadFile}
					loading={isLoading}
				>
					Créer la liste
				</Button>
			</Box>
		</Dialog>
	);
};

export default ImportList;
