import { encode } from "querystring";
import { api } from "./rtkApi";

export const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUserToken: build.query({
			query: ({ email, password }) => {
				return {
					method: "POST",
					url: `/auth/login`,
					headers: {},
					body: {
						email,
						password,
					},
				};
			},
		}),
		getUser: build.query({
			query: () => {
				return {
					method: "GET",
					url: `/auth/me`,
					headers: {},
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const { useLazyGetUserTokenQuery, useLazyGetUserQuery } = userApi;
