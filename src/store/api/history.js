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
		getHistoryStats: build.query({
			query: ({ startDate, endDate } = {}) => {
				let url = `/history/stats`;
				const params = new URLSearchParams();
				if (startDate) params.append("startDate", startDate);
				if (endDate) params.append("endDate", endDate);
				const queryString = params.toString();
				if (queryString) {
					url += `?${queryString}`;
				}

				return {
					method: "GET",
					url,
					headers: {},
				};
			},
		}),
		getInProgressHistory: build.query({
			query: () => {
				return {
					method: "GET",
					url: `/history/in-progress`,
					headers: {},
				};
			},
		}),
		getEmailsByStatus: build.query({
			query: ({ status }) => {
				return {
					method: "GET",
					url: `/history/contacts-by-status?status=${status}`,
					headers: {},
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetAllHistoryQuery,
	useGetBatchInfoQuery,
	useGetHistoryStatsQuery,
	useGetInProgressHistoryQuery,
	useGetEmailsByStatusQuery,
} = historyApi;
