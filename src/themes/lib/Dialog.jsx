import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const IDialog = React.forwardRef(function IDialog({ title, subTitle, onSubmit, children, onClose }, ref) {
	const [open, setOpen] = React.useState(false);

	React.useImperativeHandle(
		ref,
		() => {
			return {
				open() {
					setOpen(true);
				},
			};
		},
		[]
	);

	const handleClose = () => {
		onClose && onClose();
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				fullWidth={true}
				maxWidth={"sm"}
				PaperProps={{
					component: "form",
					onSubmit: (event) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						const formJson = Object.fromEntries(formData.entries());
						const email = formJson.email;
						handleClose();
						onSubmit && onSubmit(formJson);
					},
				}}
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>{subTitle}</DialogContentText>
					{children}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Annuler</Button>
					<Button type="submit">Sauvegarder</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
});

export default IDialog;
