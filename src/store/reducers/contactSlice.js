import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../api/user";

const contactSlice = createSlice({
	name: "contact",
	initialState: { selectedContacts: [] },
	reducers: {
		addSelectedContact(state, action) {
			state.selectedContacts.push(action.payload);
			console.log(action);
		},
		removeSelectedContact(state, action) {
			state.selectedContacts = state.selectedContacts.filter((item) => item.id !== action.payload.id);
		},
		resetContacts(state) {
			state.selectedContacts = [];
		},
	},
});

export default contactSlice.reducer;
export const { addSelectedContact, removeSelectedContact, resetContacts } = contactSlice.actions;

export const getSelectedContacts = (state) => state.contact.selectedContacts;
