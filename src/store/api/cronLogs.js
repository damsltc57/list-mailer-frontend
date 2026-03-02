import { api } from "./rtkApi";

export const cronLogsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCronLogs: builder.query({
            query: ({ page = 1, limit = 50 }) => `/cron-logs?page=${page}&limit=${limit}`,
            providesTags: ["CronLogs"],
        }),
    }),
});

export const { useGetCronLogsQuery } = cronLogsApi;
