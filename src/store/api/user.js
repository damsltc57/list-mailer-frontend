import { encode } from "querystring";
import { api } from "./rtkApi";

export const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUserToken: build.query({
			query: ({ email, password }) => {
				return {
					method: "POST",
					url: `/user/token`,
					headers: {},
					body: {
						email,
						password,
					},
				};
			},
		}),

		getAdmin: build.query({
			query: ({}) => {
				return {
					method: "POST",
					url: `/user/get-admin`,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: encode({}),
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const { useLazyGetUserTokenQuery, useGetAdminQuery } = userApi;
