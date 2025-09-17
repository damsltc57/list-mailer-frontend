import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
	name: "contact",
	initialState: { selectedContacts: [], selectedCollaborators: {} },
	reducers: {
		addSelectedContact(state, action) {
			state.selectedContacts.push(action.payload);
		},
		removeSelectedContact(state, action) {
			state.selectedContacts = state.selectedContacts.filter((item) => item !== action.payload.id);
		},
		setSelectedContacts(state, action) {
			state.selectedContacts = action.payload;
		},
		addSelectedCollaborator(state, action) {
			const { contactId, collaborator } = action.payload;
			const contact = state.selectedCollaborators[contactId] ?? { collaborators: [] };

			contact.collaborators = [...(contact.collaborators || []), collaborator];
			state.selectedCollaborators[contactId] = contact;
		},
		removeSelectedContactCollaborator(state, action) {
			const { contactId, collaboratorId } = action.payload;
			const contact = state.selectedCollaborators[contactId];

			if (contact && Array.isArray(contact.collaborators)) {
				contact.collaborators = contact.collaborators.filter((c) => c.id !== collaboratorId);
			}
		},
		resetContacts(state) {
			state.selectedContacts = [];
		},
		addMultipleContacts(state, action) {
			state.selectedContacts.push(...action.payload);
		},
	},
});

export default contactSlice.reducer;
export const {
	addSelectedContact,
	removeSelectedContact,
	resetContacts,
	addMultipleContacts,
	addSelectedCollaborator,
	removeSelectedContactCollaborator,
	setSelectedContacts,
} = contactSlice.actions;

export const getSelectedContacts = (state) => state.contact.selectedContacts;
export const getCollaborators = (state) => state.contact.selectedCollaborators;

export const makeGetCollaboratorsByContactId = (contactId) => (state) => {
	const contact = state.contact.selectedCollaborators[contactId];
	return contact ? contact : { collaborators: [] };
};
