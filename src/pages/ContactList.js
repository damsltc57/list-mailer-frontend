import React from "react";
import MainCard from "../components/MainCard";
import { Button } from "@mui/material";
import AddContactModal from "../components/contactList/AddContactModal";
import { useGetContactListQuery } from "../store/api/contact";

const ContactList = () => {
	const addContactRef = React.useRef(null);
	const { data } = useGetContactListQuery();
	console.log(data);
	const openAddContact = () => {
		addContactRef.current?.open();
	};

	return (
		<React.Fragment>
			<MainCard
				title={"Contacts"}
				secondary={
					<Button variant="contained" onClick={openAddContact}>
						Ajouter
					</Button>
				}
			></MainCard>
			<AddContactModal ref={addContactRef} />
		</React.Fragment>
	);
};

export default ContactList;
