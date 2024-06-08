import React, { forwardRef } from "react";
import { Box, Button, Modal, Step, StepLabel, Stepper, Typography } from "@mui/material";
import MainCard from "../MainCard";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	boxShadow: 24,
	borderRadius: 10,
	minWidth: 800,
	p: 4,
};

const steps = ["Sélection des contacts", "Vérification"];

const ContactSelectionModal = forwardRef(function ContactSelectionModal(props, ref) {
	const [open, setOpen] = React.useState(false);
	const [activeStep, setActiveStep] = React.useState(0);
	React.useImperativeHandle(ref, () => {
		return {
			open() {
				setOpen(true);
			},
		};
	}, []);

	const handleClose = () => setOpen(false);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box style={modalStyle}>
				<MainCard>
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
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
								Précédent
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />

							<Button onClick={handleNext}>
								{activeStep === steps.length - 1 ? "Envoyer" : "Suivant"}
							</Button>
						</Box>
					</React.Fragment>
				</MainCard>
			</Box>
		</Modal>
	);
});

export default ContactSelectionModal;
