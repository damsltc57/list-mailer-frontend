import React, { useState } from "react";
import { useGetAllHistoryQuery, useGetBatchInfoQuery } from "../store/api/history";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Collapse,
	Divider,
	Modal,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Grid,
	Avatar,
	useTheme,
	Button,
	IconButton,
} from "@mui/material";
import dayjs from "dayjs";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HistoryIcon from "@mui/icons-material/History";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PendingIcon from "@mui/icons-material/Pending";
import DuplicatesModal from "../components/Modals/DuplicatesModal";
import { useRemoveDuplicatesMutation } from "../store/api/history";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 1200,
	maxWidth: "80vw",
	maxHeight: "90vh",
	overflow: "auto",
	borderRadius: 3,
	p: 4,
	bgcolor: "background.paper",
	boxShadow: 24,
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
				</TableCell>

				<TableCell align="left">{row.email}</TableCell>
				<TableCell align="right">{row?.status}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div" color="error">
								Erreur: {row?.error}
							</Typography>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const Banner = () => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				bgcolor: "#6c5ce7",
				borderRadius: 4,
				p: 4,
				mb: 4,
				color: "white",
				position: "relative",
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				minHeight: 200,
			}}
		>
			<Box sx={{ position: "relative", zIndex: 1 }}>
				<Typography variant="overline" sx={{ opacity: 0.8, letterSpacing: 1, fontWeight: "bold" }}>
					HISTORIQUE
				</Typography>
				<Typography variant="h3" sx={{ fontWeight: "bold", mt: 1, mb: 3, maxWidth: "70%" }}>
					Retrouvez toutes vos campagnes passées
				</Typography>
				<Typography variant="body1" sx={{ opacity: 0.9, maxWidth: "80%", lineHeight: 1.6 }}>
					Consultez l'historique de vos envois, analysez les destinataires touchés et gardez une trace complète de vos communications passées.
				</Typography>
			</Box>

			{/* Decorative Elements */}
			<Box
				sx={{
					position: "absolute",
					top: -50,
					right: -20,
					width: 250,
					height: 250,
					borderRadius: "50%",
					bgcolor: "rgba(255, 255, 255, 0.1)",
					zIndex: 0,
				}}
			/>
			<Box
				sx={{
					position: "absolute",
					bottom: -30,
					right: 150,
					width: 150,
					height: 150,
					borderRadius: "50%",
					bgcolor: "rgba(255, 255, 255, 0.1)",
					zIndex: 0,
				}}
			/>
		</Box>
	);
};

const SectionHeader = ({ title, onPrev, onNext, showArrows = true }) => (
	<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
		<Typography variant="h5" fontWeight="bold">
			{title}
		</Typography>
		{showArrows && (
			<Box sx={{ display: "flex", gap: 1 }}>
				<IconButton size="small" sx={{ border: "1px solid", borderColor: "divider" }} onClick={onPrev}>
					<ChevronLeftIcon />
				</IconButton>
				<IconButton size="small" sx={{ bgcolor: "#6c5ce7", color: "white", "&:hover": { bgcolor: "#5b4bc4" } }} onClick={onNext}>
					<ChevronRightIcon />
				</IconButton>
			</Box>
		)}
	</Box>
);

const getStatusDisplay = (status) => {
	switch (status) {
		case "EN ATTENTE":
			return {
				icon: <PendingIcon sx={{ fontSize: 14, color: "warning.main" }} />,
				text: "EN ATTENTE",
				color: "warning.main",
			};
		case "EN COURS":
			return {
				icon: <AutorenewIcon sx={{ fontSize: 14, color: "info.main", animation: "spin 2s linear infinite" }} />,
				text: "EN COURS",
				color: "info.main",
			};
		case "ARCHIVÉE":
		default:
			return {
				icon: <CheckCircleOutlineIcon sx={{ fontSize: 14, color: "success.main" }} />,
				text: "ARCHIVÉE",
				color: "text.secondary",
			};
	}
};

const History = () => {
	const theme = useTheme();
	const [openModalItem, setOpenModalItem] = useState(null);
	const [openDuplicatesModal, setOpenDuplicatesModal] = useState(false);

	const { data, refetch: refetchHistory } = useGetAllHistoryQuery({});
	const { data: infos, refetch: refetchInfos } = useGetBatchInfoQuery({ batchId: openModalItem?.id }, { skip: !openModalItem });
	const [removeDuplicates, { isLoading: isRemovingDuplicates }] = useRemoveDuplicatesMutation();

	const handleOpen = (email) => setOpenModalItem(email);
	const handleClose = () => setOpenModalItem(null);

	const handleRemoveDuplicates = async () => {
		if (!openModalItem) return;
		try {
			await removeDuplicates({ batchId: openModalItem.id }).unwrap();
			setOpenDuplicatesModal(false);
			refetchInfos();
			refetchHistory();
		} catch (error) {
			console.error("Failed to remove duplicates:", error);
		}
	};

	return (
		<Box sx={{ p: { xs: 2, md: 4 }, bgcolor: theme.palette.mode === "dark" ? "background.default" : "#f8f9fc", minHeight: "100vh" }}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Banner />

					<SectionHeader title="Toutes vos campagnes" showArrows={true} />

					<Grid container spacing={3}>
						{!data || data.length === 0 ? (
							<Grid item xs={12}>
								<Paper
									elevation={0}
									sx={{
										p: 6,
										textAlign: "center",
										bgcolor: "transparent",
										border: "2px dashed",
										borderColor: "divider",
										borderRadius: 4,
									}}
								>
									<Typography variant="h6" color="textSecondary" fontWeight="medium">
										Aucune campagne trouvée dans l'historique.
									</Typography>
								</Paper>
							</Grid>
						) : (
							data.map((mail) => (
								<Grid item xs={12} sm={6} md={4} lg={3} key={mail.id}>
									<Card
										sx={{
											height: "100%",
											display: "flex",
											flexDirection: "column",
											borderRadius: 4,
											border: "1px solid",
											borderColor: "divider",
											boxShadow: "none",
											transition: "transform 0.2s, box-shadow 0.2s",
											"&:hover": {
												transform: "translateY(-4px)",
												boxShadow: theme.shadows[10],
											},
										}}
									>
										<CardActionArea onClick={() => handleOpen(mail)} sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
											<Box
												sx={{
													height: 140,
													bgcolor: "grey.100",
													position: "relative",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													borderBottom: "1px solid",
													borderColor: "divider",
												}}
											>
												<HistoryIcon sx={{ fontSize: 60, color: "grey.300" }} />
												{(() => {
													const statusDisplay = getStatusDisplay(mail.campaignStatus || "ARCHIVÉE");
													return (
														<Box
															sx={{
																position: "absolute",
																bottom: 8,
																left: 8,
																bgcolor: "common.white",
																px: 1,
																py: 0.5,
																borderRadius: 1,
																fontSize: "0.75rem",
																fontWeight: "bold",
																display: "flex",
																alignItems: "center",
																gap: 0.5,
																color: statusDisplay.color,
																boxShadow: 1,
															}}
														>
															{statusDisplay.icon} {statusDisplay.text}
														</Box>
													);
												})()}
												{mail.hasDuplicates && (
													<Box
														sx={{
															position: "absolute",
															top: 8,
															right: 8,
															bgcolor: "warning.light",
															color: "warning.dark",
															px: 1,
															py: 0.5,
															borderRadius: 1,
															display: "flex",
															alignItems: "center",
															boxShadow: 1,
														}}
														title="Des doublons sont présents dans cette liste"
													>
														<WarningAmberIcon sx={{ fontSize: 20 }} />
													</Box>
												)}
											</Box>

											<CardContent sx={{ flexGrow: 1 }}>
												<Typography variant="subtitle1" fontWeight="bold" noWrap gutterBottom>
													{mail.object}
												</Typography>
												<Typography
													color="text.secondary"
													variant="body2"
													dangerouslySetInnerHTML={{ __html: mail?.content }}
													sx={{
														overflow: "hidden",
														display: "-webkit-box",
														WebkitLineClamp: 2,
														WebkitBoxOrient: "vertical",
														mb: 2,
														minHeight: "3em",
													}}
												/>
												<Divider sx={{ my: 1.5 }} />
												<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
													<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
														<Avatar sx={{ width: 24, height: 24, fontSize: "0.75rem", bgcolor: "#6c5ce7" }}>
															MC
														</Avatar>
														<Typography variant="caption" fontWeight="medium">
															Campagne
														</Typography>
													</Box>
													<Typography variant="caption" color="textSecondary">
														{dayjs(mail?.createdAt).format("DD/MM/YYYY")}
													</Typography>
												</Box>
											</CardContent>
										</CardActionArea>
									</Card>
								</Grid>
							))
						)}
					</Grid>
				</Grid>
			</Grid>

			{/* Modal for detail view */}
			<Modal
				open={!!openModalItem}
				onClose={handleClose}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<Box sx={style}>
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
						<Typography id="modal-title" variant="h5" fontWeight="bold">
							{openModalItem?.object}
						</Typography>
					</Box>

					<Box
						sx={{
							bgcolor: "grey.50",
							p: 3,
							borderRadius: 3,
							border: "1px solid",
							borderColor: "divider",
							mb: 4,
						}}
					>
						<Typography
							id="modal-description"
							dangerouslySetInnerHTML={{ __html: openModalItem?.content }}
						></Typography>
					</Box>

					<Typography variant="h6" fontWeight="bold" mb={1}>
						Progression de l'envoi
					</Typography>
					<Typography color="textSecondary" variant="body2" mb={3}>
						Campagne du {dayjs(openModalItem?.createdAt).format("DD/MM/YYYY HH:mm")} envoyée à{" "}
						<strong>{infos?.list?.length || 0}</strong> destinataire(s) via{" "}
						<Box component="span" sx={{ bgcolor: "#e0e7ff", color: "#4338ca", px: 1, py: 0.5, borderRadius: 1, fontWeight: "medium" }}>
							{infos?.mailAccount?.email || "chargement..."}
						</Box>
					</Typography>

					{/* Custom Progress Bar matching the style */}
					<Box sx={{ mb: 4, bgcolor: "grey.100", p: 2, borderRadius: 2 }}>
						<Box sx={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", mb: 2 }}>
							<Box sx={{ width: `${((infos?.sent || 0) / Math.max(infos?.list?.length || 1, 1)) * 100}%`, bgcolor: theme.palette.statColors.Envoyé, transition: "width 0.5s" }} />
							<Box sx={{ width: `${((infos?.pending || 0) / Math.max(infos?.list?.length || 1, 1)) * 100}%`, bgcolor: theme.palette.statColors.Attente, transition: "width 0.5s" }} />
							<Box sx={{ width: `${((infos?.error || 0) / Math.max(infos?.list?.length || 1, 1)) * 100}%`, bgcolor: theme.palette.statColors.Erreur, transition: "width 0.5s" }} />
						</Box>
						<Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: theme.palette.statColors.Envoyé }} />
								<Typography variant="body2">Envoyé ({infos?.sent || 0})</Typography>
							</Box>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: theme.palette.statColors.Attente }} />
								<Typography variant="body2">En attente ({infos?.pending || 0})</Typography>
							</Box>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: theme.palette.statColors.Erreur }} />
								<Typography variant="body2">Erreur ({infos?.error || 0})</Typography>
							</Box>
						</Box>
					</Box>

					<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
						<Typography variant="h6" fontWeight="bold">
							Liste des destinataires
						</Typography>
						{infos?.hasDuplicates && (
							<Button
								variant="outlined"
								color="warning"
								size="small"
								startIcon={<WarningAmberIcon />}
								onClick={() => setOpenDuplicatesModal(true)}
							>
								Doublons détectés
							</Button>
						)}
					</Box>

					<Box
						sx={{
							overflow: "auto",
							maxHeight: "35vh",
							border: "1px solid",
							borderColor: "divider",
							borderRadius: 3,
						}}
					>
						<TableContainer component={Paper} elevation={0}>
							<Table stickyHeader sx={{ minWidth: 200 }} aria-label="destinataires table">
								<TableHead>
									<TableRow>
										<TableCell width="50px" sx={{ bgcolor: "grey.50" }} />
										<TableCell align="left" sx={{ fontWeight: "bold", bgcolor: "grey.50" }}>
											Email
										</TableCell>
										<TableCell align="right" sx={{ fontWeight: "bold", bgcolor: "grey.50" }}>
											Statut
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{infos?.list?.length > 0 ? (
										infos.list.map((row) => <Row key={row.email || row.id} row={row} />)
									) : (
										<TableRow>
											<TableCell colSpan={3} align="center" sx={{ py: 4, color: "text.secondary" }}>
												Chargement des données...
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Box>
			</Modal>

			{/* Duplicates Modal */}
			<DuplicatesModal
				open={openDuplicatesModal}
				onClose={() => setOpenDuplicatesModal(false)}
				onConfirm={handleRemoveDuplicates}
				isLoading={isRemovingDuplicates}
			/>

			<style>
				{`
					@keyframes spin {
						0% { transform: rotate(0deg); }
						100% { transform: rotate(360deg); }
					}
				`}
			</style>
		</Box>
	);
};

export default History;
