// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
	openItem: ["dashboard"],
	openComponent: "buttons",
	drawerOpen: true,
	componentDrawerOpen: true,
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
	name: "menu",
	initialState,
	reducers: {
		activeComponent(state, action) {
			state.openComponent = action.payload.openComponent;
		},

		openDrawer(state, action) {
			console.log("Calling");
			console.log(action);
			state.drawerOpen = action.payload.drawerOpen;
		},

		openComponentDrawer(state, action) {
			state.componentDrawerOpen = action.payload.componentDrawerOpen;
		},
	},
});

export default menu.reducer;

export const { activeComponent, openDrawer, openComponentDrawer } = menu.actions;
