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
		getUserEmailAdresses: build.query({
			query: () => {
				return {
					method: "GET",
					url: `/mail-account/list`,
					headers: {},
				};
			},
		}),
		getGoogleOauthUrl: build.query({
			query: () => {
				return {
					method: "GET",
					url: `/auth/google/oauth`,
					headers: {},
				};
			},
		}),
		registerGoogleOAuth: build.mutation({
			query: ({ code }) => {
				return {
					method: "POST",
					url: `/auth/google/register`,
					headers: {},
					body: {
						code,
					},
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const {
	useLazyGetUserTokenQuery,
	useLazyGetUserQuery,
	useGetUserEmailAdressesQuery,
	useGetGoogleOauthUrlQuery,
	useRegisterGoogleOAuthMutation,
} = userApi;
