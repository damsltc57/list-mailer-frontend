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
		getHistoryChartStats: build.query({
			query: ({ startDate, endDate, groupBy = "hour" } = {}) => {
				let url = `/history/stats/chart`;
				const params = new URLSearchParams();
				if (startDate) params.append("startDate", startDate);
				if (endDate) params.append("endDate", endDate);
				if (groupBy) params.append("groupBy", groupBy);
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
			query: ({ status, page = 1, limit = 500 }) => {
				return {
					method: "GET",
					url: `/history/contacts-by-status?status=${status}&page=${page}&limit=${limit}`,
					headers: {},
				};
			},
			// Always merge incoming data to the cache data
			serializeQueryArgs: ({ queryArgs }) => {
				return `${queryArgs.status}`;
			},
			merge: (currentCache, newItems, { arg }) => {
				if (arg.page === 1) {
					return newItems;
				}
				currentCache.data.push(...newItems.data);
				currentCache.total = newItems.total;
				return currentCache;
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.page !== previousArg?.page || currentArg?.status !== previousArg?.status;
			},
		}),
		removeDuplicates: build.mutation({
			query: ({ batchId }) => {
				return {
					method: "DELETE",
					url: `/history/batch/${batchId}/duplicates`,
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
	useGetHistoryChartStatsQuery,
	useGetInProgressHistoryQuery,
	useGetEmailsByStatusQuery,
	useRemoveDuplicatesMutation,
} = historyApi;
