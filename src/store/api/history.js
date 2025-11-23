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
		getBatchInfo: build.query({
			query: ({ batchId }) => {
				return {
					method: "GET",
					url: `/history/batch/infos?batchId=${batchId}`,
					headers: {},
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const { useGetAllHistoryQuery, useGetBatchInfoQuery } = historyApi;
