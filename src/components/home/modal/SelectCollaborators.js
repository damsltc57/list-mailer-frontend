import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, FormGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	addSelectedCollaborator,
	makeGetCollaboratorsByContactId,
	removeSelectedContactCollaborator,
} from "../../../store/reducers/contactSlice";

function ConfirmationDialogRaw(props) {
	const { onClose, open, contact, ...other } = props;
	const radioGroupRef = React.useRef(null);
	const dispatch = useDispatch();
	const selectedCollaborators = useSelector(makeGetCollaboratorsByContactId(contact?.id));

	const handleOk = () => {
		onClose();
	};

	return (
		<Dialog sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }} maxWidth="xs" open={open} {...other}>
			<DialogTitle>Collaborateurs</DialogTitle>
			<DialogContent dividers>
				<FormGroup ref={radioGroupRef} aria-label="ringtone" name="ringtone">
					{contact?.collaborators?.map((option) => (
						<FormControlLabel
							value={option}
							key={option.email}
							control={
								<Checkbox
									onChange={(data) => {
										if (data.target.checked) {
											dispatch(
												addSelectedCollaborator({
													contactId: contact.id,
													collaborator: option,
												}),
											);
										} else {
											dispatch(
												removeSelectedContactCollaborator({
													contactId: contact.id,
													collaboratorId: option.id,
												}),
											);
										}
									}}
									checked={
										!!selectedCollaborators?.collaborators.find((item) => item.id === option.id)
									}
								/>
							}
							label={option.firstName + " " + option.lastName + " - " + option.email}
						/>
					))}
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleOk}>Ok</Button>
			</DialogActions>
		</Dialog>
	);
}

ConfirmationDialogRaw.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	value: PropTypes.string.isRequired,
	contact: PropTypes.object,
};

export default function SelectCollaborators({ contact, setSelectedContact }) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("Dione");

	const handleClickListItem = () => {
		setOpen(true);
	};

	React.useEffect(() => {
		if (!!contact) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [contact]);

	const handleClose = (newValue) => {
		setOpen(false);
		setSelectedContact(null);

		if (newValue) {
			setValue(newValue);
		}
	};

	return (
		<Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
			<ConfirmationDialogRaw
				id="ringtone-menu"
				keepMounted
				open={open}
				onClose={handleClose}
				value={value}
				contact={contact}
			/>
		</Box>
	);
}
