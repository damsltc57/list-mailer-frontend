import { api } from "./rtkApi";

export const emailApi = api.injectEndpoints({
	endpoints: (build) => ({
		sendEmail: build.mutation({
			query: ({ object, selectedAddress, attachments, content, to }) => {
				return {
					method: "POST",
					url: `/send-mail`,
					headers: {},
					body: { object, selectedAddress, attachments, content, to },
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const { useSendEmailMutation } = emailApi;
