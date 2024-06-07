import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_URL,
		prepareHeaders: async (headers) => {
			let authToken = localStorage.getItem("token");
			if (authToken) {
				headers.set("authorization", `Bearer ${authToken}`);
			}
			return headers;
		},
	}),
	keepUnusedDataFor: 0.001,

	endpoints: () => ({}),
	reducerPath: "api",
	tagTypes: [""],
});
