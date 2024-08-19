import { api } from "./rtkApi";

export const historyApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllHistory: build.query({
			query: () => {
				return {
					method: "GET",
					url: `/history/`,
					headers: {},
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const { useGetAllHistoryQuery } = historyApi;
