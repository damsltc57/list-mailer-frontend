import React, { forwardRef } from "react";
import { Box, Button, Modal, Step, StepLabel, Stepper, Typography } from "@mui/material";
import MainCard from "../MainCard";
import ContactSelectionContent from "./ContactSelectionContent";
import GridPreviewFinalSelectedContacts from "./GridPreviewFinalSelectedContacts";
import { useSendEmailMutation } from "../../store/api/email";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedContacts, resetContacts } from "../../store/reducers/contactSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90%",
	boxShadow: 24,
	borderRadius: 10,
	minWidth: 800,
	maxHeight: "90vw",
	p: 4,
};

const steps = ["Sélection des contacts", "Vérification"];

const ContactSelectionModal = forwardRef(function ContactSelectionModal(
	{ object, selectedAddress, attachments, editor, signature, setObject },
	ref,
) {
	const [open, setOpen] = React.useState(false);
	const [activeStep, setActiveStep] = React.useState(0);
	const [sendEmailMutation] = useSendEmailMutation();
	const selectedContacts = useSelector(getSelectedContacts);
	const dispatch = useDispatch();

	React.useImperativeHandle(ref, () => {
		return {
			open() {
				setOpen(true);
			},
		};
	}, []);

	const handleClose = () => setOpen(false);

	const sendEmail = () => {
		const content = editor.getHTML();
		sendEmailMutation({ object, selectedAddress, attachments, content, to: selectedContacts });
		//TODO: uncomment
		// localStorage.removeItem("draftMail");
		// localStorage.removeItem("draftObject");
		// editor.commands.setContent(`<p><br/></p><p><br/></p><p><br/></p>${signature}`);
		// dispatch(resetContacts());
		// setObject("");
		setActiveStep(0);
		setOpen(false);
	};

	const handleNext = () => {
		if (activeStep === steps.length - 1) {
			sendEmail();
			return;
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			maxWidth={false}
			scroll={"paper"}
		>
			<DialogTitle>
				<Stepper activeStep={activeStep} sx={{ marginBottom: 5 }}>
					{steps.map((label, index) => {
						const stepProps = {};

						return (
							<Step key={label} {...stepProps}>
								<StepLabel>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
			</DialogTitle>
			<DialogContent dividers={true}>
				{activeStep === 0 && <ContactSelectionContent />}
				{activeStep === 1 && <GridPreviewFinalSelectedContacts />}
			</DialogContent>

			<DialogActions>
				<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
					<Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
						Précédent
					</Button>
					<Box sx={{ flex: "1 1 auto" }} />

					<Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Envoyer" : "Suivant"}</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
});

export default ContactSelectionModal;
