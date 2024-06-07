// third-party
import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";

// project import
import reducers from "./reducers";
import { api } from "./api/rtkApi";

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
	// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
	if (isRejectedWithValue(action) && action?.payload.status === 401) {
		localStorage.removeItem("token");
		console.warn("We got a rejected action!");
	}

	return next(action);
};

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryErrorLogger).concat(api.middleware),
});

const { dispatch } = store;

export { store, dispatch };
