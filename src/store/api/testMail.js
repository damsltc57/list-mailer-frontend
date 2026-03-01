import { api } from "./rtkApi";

export const testMailApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTestMailHistory: build.query({
            query: () => ({
                method: "GET",
                url: `/test-mails/`,
                headers: {},
            }),
            providesTags: ["TestMailHistory"],
        }),
        sendTestMail: build.mutation({
            query: ({ object, selectedAddress, attachments, content, to }) => {
                const data = new FormData();

                if (attachments && attachments.length > 0) {
                    for (const key of attachments) {
                        data.append(key.name, key);
                    }
                }
                data.append("object", object);
                data.append("selectedAddress", selectedAddress);
                data.append("content", content);
                data.append("to", to);

                return {
                    method: "POST",
                    url: `/test-mails/send`,
                    headers: {},
                    body: data,
                };
            },
            invalidatesTags: ["TestMailHistory"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetTestMailHistoryQuery,
    useSendTestMailMutation,
} = testMailApi;
