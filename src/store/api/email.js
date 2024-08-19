import { api } from "./rtkApi";

export const emailApi = api.injectEndpoints({
	endpoints: (build) => ({
		sendEmail: build.mutation({
			query: ({ object, selectedAddress, attachments, content, to }) => {
				const obj = {};
				const data = new FormData();

				for (const key of attachments) {
					obj[key.name] = key;
					data.append(key.name, key);
				}
				data.append("object", object);
				data.append("selectedAddress", selectedAddress);
				data.append("attachments", attachments);
				data.append("content", content);
				data.append("to", JSON.stringify(to));
				return {
					method: "POST",
					url: `/send-mail`,
					headers: {},
					body: data,
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const { useSendEmailMutation } = emailApi;
