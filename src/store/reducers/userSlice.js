import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "user",
	initialState: { authToken: null, user: null },
	reducers: {
		setAuthToken(state, action) {
			localStorage.setItem("token", action.payload);

			state.authToken = action.payload;
		},
		setUser(state, action) {
			state.user = action.payload;
		},
	},
});

export default slice.reducer;
export const { setAuthToken, setUser } = slice.actions;

// export const getAuthToken = (state) => state?.user?.authToken;
export const getAuthToken = () => localStorage.getItem("token");
export const getUser = (state) => state.user.user;
