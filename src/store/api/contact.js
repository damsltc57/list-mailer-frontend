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
		findContact: build.query({
			query: ({ categoryValue, formalityLevel, interesting, country, query }) => {
				return {
					method: "GET",
					url: `/contact/find`,
					headers: {},
					params: {
						categoryValue,
						formalityLevel,
						interesting,
						country,
						query,
					},
				};
			},
		}),
		importContacts: build.mutation({
			query: ({ file, listName }) => {
				const body = new FormData();
				body.append("file", file);
				body.append("listName", listName);
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

export const {
	useCreateContactMutation,
	useGetContactListQuery,
	useImportContactsMutation,
	useUpdateContactMutation,
	useFindContactQuery,
} = contactApi;
