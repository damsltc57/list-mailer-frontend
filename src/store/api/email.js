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
		testEmail: build.query({
			query: ({ addressId }) => {
				return {
					method: "GET",
					url: `/mail-account/test/${addressId}`,
					headers: {},
				};
			},
		}),
		updateAddressEmail: build.mutation({
			query: ({ addressId, ...args }) => {
				return {
					method: "POST",
					url: `/mail-account/update/${addressId}`,
					headers: {},
					body: args,
				};
			},
		}),
		createAddressEmail: build.mutation({
			query: ({ ...args }) => {
				return {
					method: "POST",
					url: `/mail-account/create`,
					headers: {},
					body: args,
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const {
	useSendEmailMutation,
	useLazyTestEmailQuery,
	useUpdateAddressEmailMutation,
	useCreateAddressEmailMutation,
} = emailApi;
