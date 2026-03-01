import { api } from "./rtkApi";

export const settingsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getGlobalSettings: build.query({
            query: () => ({
                method: "GET",
                url: `/settings`,
                headers: {},
            }),
            providesTags: ["GlobalSettings"],
        }),
        updateGlobalSettings: build.mutation({
            query: ({ batchLimit }) => {
                return {
                    method: "POST",
                    url: `/settings/update`,
                    headers: {},
                    body: { batchLimit },
                };
            },
            invalidatesTags: ["GlobalSettings"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetGlobalSettingsQuery,
    useUpdateGlobalSettingsMutation,
} = settingsApi;
