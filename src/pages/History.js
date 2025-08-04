import React from "react";
import MainCard from "../components/MainCard";
import { useGetAllHistoryQuery } from "../store/api/history";
import { Box, Card, CardActionArea, CardContent, Divider, Modal, Typography } from "@mui/material";
import dayjs from "dayjs";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 1200,
	maxWidth: "80vw",
	maxHeight: "90vh",
};

const History = () => {
	const [open, setOpen] = React.useState(null);
	const handleOpen = (email) => setOpen(email);
	const handleClose = () => setOpen(null);

	const { data } = useGetAllHistoryQuery({});

	return (
		<MainCard title={"Historique"}>
			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
				{data?.map((mail) => (
					<Card sx={{ width: 300 }}>
						<CardActionArea onClick={() => handleOpen(mail)}>
							<CardContent>
								<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
									{mail.object}
								</Typography>
								<Typography variant="h5" component="div"></Typography>

								<Typography
									variant="body2"
									dangerouslySetInnerHTML={{ __html: mail?.content }}
									sx={{
										overflow: "hidden",
										display: "-webkit-box",
										"-webkit-line-clamp": 2,
										lineClamp: 2,
										"-webkit-box-orient": "vertical",
										"& > p": {},
									}}
								></Typography>
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
						<Typography color={"secondary"} mt={2}>
							Envoyé le {dayjs(open?.createdAt).format("DD/MM/YYYY")} à {open?.to?.length} destinataire(s)
						</Typography>
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2, overflow: 'auto', maxHeight: '50vh' }}>
							{open?.to?.map((to) => (
								<Card>
									<CardContent>
										<Box>{to?.email}</Box>
										<Typography color={"secondary"}>{to?.MailHistoriesContacts?.status}</Typography>
									</CardContent>
								</Card>
							))}
						</Box>
					</MainCard>
				</Box>
			</Modal>
		</MainCard>
	);
};

export default History;
