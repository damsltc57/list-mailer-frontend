import React from "react";
import MainCard from "../components/MainCard";
import { useGetAllHistoryQuery, useGetBatchInfoQuery } from "../store/api/history";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Collapse,
	Divider,
	IconButton,
	Modal,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import SegmentedProgressBar from "../components/SegmentedProgressBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 1200,
	maxWidth: "80vw",
	maxHeight: "90vh",
	overflow: "auto",
};

const stats = {
	sent: 120,
	error: 10,
	pending: 30,
};

const colors = {
	Envoyé: "#4caf50", // vert
	Erreur: "#f44336", // rouge
	Attente: "#ff9800", // orange
};

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow
				sx={{ "& > *": { borderBottom: "unset" }, cursor: !!row.error ? "pointer" : "auto" }}
				onClick={() => !!row.error && setOpen(!open)}
			>
				<TableCell align={"center"}>
					{!!row.error && <ErrorOutlineIcon color={"error"} />}
					{/*<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>*/}
					{/*	{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}*/}
					{/*</IconButton>*/}
				</TableCell>

				<TableCell align="left">{row.email}</TableCell>
				<TableCell align="right">{row?.status}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Erreur: {row?.error}
							</Typography>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const History = () => {
	const [open, setOpen] = React.useState(null);
	const handleOpen = (email) => setOpen(email);
	const handleClose = () => setOpen(null);

	const { data } = useGetAllHistoryQuery({});

	const { data: infos } = useGetBatchInfoQuery({ batchId: open?.id }, { skip: !open });

	return (
		<MainCard title={"Historique"}>
			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
				{data?.map((mail) => (
					<Card sx={{ width: 300 }}>
						<CardActionArea onClick={() => handleOpen(mail)}>
							<CardContent>
								<Typography sx={{ fontSize: 14 }} gutterBottom>
									{mail.object}
								</Typography>
								<Typography variant="h5" component="div"></Typography>

								<Typography
									color="text.secondary"
									variant="body2"
									dangerouslySetInnerHTML={{ __html: mail?.content?.slice(0, 200) }}
									sx={{
										overflow: "hidden",
										display: "-webkit-box",
										"-webkit-line-clamp": 2,
										lineClamp: 2,
										"-webkit-box-orient": "vertical",
										"& > p": {},
									}}
								></Typography>
								<Typography align={"right"} variant={"body2"} sx={{ opacity: 0.6 }}>
									{dayjs(mail?.createdAt).format("DD/MM/YYYY")}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				))}
			</Box>
			<Modal
				open={!!open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<MainCard title={open?.object}>
						<Typography
							id="modal-modal-description"
							sx={{ mt: 2 }}
							dangerouslySetInnerHTML={{ __html: open?.content }}
						></Typography>
						<Divider />
						<Typography color={"secondary"} mt={2} mb={3}>
							Envoyé le {dayjs(open?.createdAt).format("DD/MM/YYYY")} à {infos?.list?.length}{" "}
							destinataire(s) par <strong>{infos?.mailAccount?.email}</strong>
						</Typography>
						<SegmentedProgressBar
							stats={{ Envoyé: infos?.sent, Attente: infos?.pending, Erreur: infos?.error }}
							colors={colors}
						/>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: 2,
								mt: 2,
								overflow: "auto",
								maxHeight: "50vh",
							}}
						>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 200 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell />
											<TableCell align={"left"}>Email</TableCell>
											<TableCell align="right">Status</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{/*{infos?.list?.map((row) => (*/}
										{/*	<TableRow*/}
										{/*		key={row.name}*/}
										{/*		sx={{ "&:last-child td, &:last-child th": { border: 0 } }}*/}
										{/*	>*/}
										{/*		<TableCell align="left">{row.email}</TableCell>*/}
										{/*		<TableCell align="right">{row?.status}</TableCell>*/}
										{/*	</TableRow>*/}
										{/*))}*/}
										{infos?.list?.map((row) => (
											<Row key={row.name} row={row} />
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</MainCard>
				</Box>
			</Modal>
		</MainCard>
	);
};

export default History;
