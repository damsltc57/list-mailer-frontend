import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../api/user";

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
	extraReducers: (builder) => {
		builder.addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
			if (payload?.user) {
				state.user = payload.user;
			}
		});
	},
});

export default slice.reducer;
export const { setAuthToken, setUser } = slice.actions;

// export const getAuthToken = (state) => state?.user?.authToken;
export const getAuthToken = () => localStorage.getItem("token");
export const getUser = (state) => state.user.user;

export const getUserSignature = (state) => state.user?.user?.signature;
