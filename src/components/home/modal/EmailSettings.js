import { Box, Button, Checkbox, Chip, Divider, FormControlLabel, Grid, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import {
	useCreateAddressEmailMutation,
	useLazyTestEmailQuery,
	useUpdateAddressEmailMutation,
} from "../../../store/api/email";
import DKIMInfo from "./DKIMInfo";

const EmailSettings = ({ email, refetchUserList }) => {
	const [emailAddr, setEmailAddr] = React.useState(email?.email || "");
	const [emailNickname, setEmailNickName] = React.useState(email?.emailNickname || "");
	const [host, setHost] = React.useState(email?.host || "");
	const [port, setPort] = React.useState(email?.port || 0);
	const [password, setPassword] = React.useState(email?.pass || "");
	const [signature, setSignature] = React.useState(email?.signature || "");
	const [testEmailStatus, setTestEmailStatus] = React.useState(null);
	const [dkim, setDkim] = React.useState(email?.dkim || {});
	const [secure, setSecure] = React.useState(email?.secure || false);

	const [testEmailQuery] = useLazyTestEmailQuery();
	const [updateEmailMutation] = useUpdateAddressEmailMutation();
	const [createEmailMutation] = useCreateAddressEmailMutation();

	const testEmail = () => {
		setTestEmailStatus(null);
		testEmailQuery({ addressId: email?.id }).then(({ data }) => {
			console.log(data);
			setTestEmailStatus(data);
		});
	};

	const updateEmail = () => {
		const queryFct = !!email?.id ? updateEmailMutation : createEmailMutation;
		queryFct({
			addressId: email?.id,
			email: emailAddr,
			emailNickname,
			host,
			port,
			pass: password,
			signature,
			dkim,
			secure,
		}).then(({ data }) => {
			refetchUserList();
		});
	};

	const renderConnexionStatus = React.useMemo(() => {
		if (!testEmailStatus) return null;
		if (testEmailStatus === true) return <Chip color="success" label={"Connexion réussie"} size="big" />;
		return <Chip color="error" label={"Erreur lors de la connexion"} size="big" />;
	}, [testEmailStatus]);

	return (
		<Stack direction="column" spacing={3}>
			<TextField
				fullWidth
				id="outlined-controlled"
				label="Adresse e-mail"
				value={emailAddr}
				onChange={(event) => {
					setEmailAddr(event.target.value);
				}}
			/>
			<TextField
				fullWidth
				id="outlined-controlled"
				label="Nom de l'adresse e-mail"
				value={emailNickname}
				onChange={(event) => {
					setEmailNickName(event.target.value);
				}}
			/>
			<TextField
				fullWidth
				id="outlined-controlled"
				label="Host"
				value={host}
				onChange={(event) => {
					setHost(event.target.value);
				}}
			/>
			<TextField
				fullWidth
				type={"number"}
				id="outlined-controlled"
				label="Port"
				value={port}
				onChange={(event) => {
					setPort(event.target.value);
				}}
			/>
			<TextField
				fullWidth
				id="outlined-controlled"
				label="Mot de passe"
				value={password}
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			/>
			<TextField
				fullWidth
				id="outlined-controlled"
				label="Signature"
				value={signature}
				multiline={true}
				minRows={4}
				maxRows={7}
				onChange={(event) => {
					setSignature(event.target.value);
				}}
			/>
			<FormControlLabel
				control={<Checkbox checked={secure} onChange={(event) => setSecure(event.target.checked)} />}
				label="Connexion sécurisée"
			/>
			<DKIMInfo dkim={dkim} setDkim={setDkim} />
			<Button onClick={updateEmail}>Sauvegarder</Button>
			<Divider />
			<Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
				{!!email?.id && (
					<React.Fragment>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								flex: 1,
								flexDirection: "column",
								gap: 4,
							}}
						>
							<Button onClick={testEmail}>Tester la connexion</Button>
							{renderConnexionStatus}
						</Box>
						<Box sx={{ width: 10 }}>
							<Divider orientation={"vertical"} />
						</Box>
					</React.Fragment>
				)}
				<Box>
					<div dangerouslySetInnerHTML={{ __html: signature }} />
				</Box>
			</Box>
		</Stack>
	);
};

export default EmailSettings;
