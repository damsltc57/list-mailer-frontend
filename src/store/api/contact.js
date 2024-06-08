import { api } from "./rtkApi";

export const contactApi = api.injectEndpoints({
	endpoints: (build) => ({
		createContact: build.mutation({
			query: ({
				firstName,
				lastName,
				email,
				companyName,
				tvProducer,
				filmProducer,
				broadcaster,
				distributor,
				formalityLevel,
			}) => {
				return {
					method: "POST",
					url: `/contact/create`,
					headers: {},
					body: {
						firstName,
						lastName,
						email,
						companyName,
						tvProducer,
						filmProducer,
						broadcaster,
						distributor,
						formalityLevel,
					},
				};
			},
		}),
		updateContact: build.mutation({
			query: (args) => {
				return {
					method: "POST",
					url: `/contact/update`,
					headers: {},
					body: args,
				};
			},
		}),
		getContactList: build.query({
			query: () => {
				return {
					method: "GET",
					url: `/contact/list`,
					headers: {},
				};
			},
		}),
		importContacts: build.mutation({
			query: ({ file }) => {
				const body = new FormData();
				body.append("file", file);
				return {
					method: "POST",
					url: "/contact/import",
					headers: {},
					body,
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const { useCreateContactMutation, useGetContactListQuery, useImportContactsMutation, useUpdateContactMutation } =
	contactApi;
