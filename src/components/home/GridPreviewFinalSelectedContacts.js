import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addSelectedContact,
	getCollaborators,
	getSelectedContacts,
	removeSelectedContact,
} from "../../store/reducers/contactSlice";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { useFindContactQuery, useGetContactByIdsQuery } from "../../store/api/contact";

const GridPreviewFinalSelectedContacts = () => {
	const selectedContacts = useSelector(getSelectedContacts);
	const dispatch = useDispatch();
	const selectedCollaborators = useSelector(getCollaborators);

	const removeItem = (contact) => {
		dispatch(removeSelectedContact(contact));
	};

	const { data } = useGetContactByIdsQuery({
		ids: selectedContacts,
	});

	return (
		<Grid container sx={{ mt: 1 }} spacing={2}>
			{data?.map((contact) => (
				<Grid item>
					<Card>
						<CardActionArea>
							<CardContent onClick={() => removeItem(contact)} sx={{ cursor: "pointer" }}>
								<Typography
									sx={{ fontSize: 14 }}
									color="text.primary"
									fontWeight={600}
									gutterBottom
									variant="h5"
								>
									{contact?.companyName}
								</Typography>
								<Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={500}>
									{selectedCollaborators?.[contact.id]?.collaborators
										?.map((item) => item.email)
										.join(", ")}
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
