import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedContact, getSelectedContacts, removeSelectedContact } from "../../store/reducers/contactSlice";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

const GridPreviewFinalSelectedContacts = () => {
	const selectedContacts = useSelector(getSelectedContacts);
	const dispatch = useDispatch();

	const removeItem = (contact) => {
		dispatch(removeSelectedContact(contact));
	};

	return (
		<Grid container sx={{ mt: 1 }} spacing={2}>
			{selectedContacts.map((contact) => (
				<Grid item>
					<Card>
						<CardActionArea>
							<CardContent>
								<Typography sx={{ fontSize: 14 }} color="text.primary" fontWeight={600}>
									{contact?.companyName}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default GridPreviewFinalSelectedContacts;
