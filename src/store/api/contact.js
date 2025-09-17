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
			query: ({ list }) => {
				return {
					method: "GET",
					url: `/contact/list/${list}`,
					headers: {},
				};
			},
		}),
		findContact: build.query({
			query: ({ categoryValue, formalityLevel, interesting, country, query, listId }) => {
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
						listId,
					},
				};
			},
		}),
		importContacts: build.mutation({
			query: ({ file, list }) => {
				const body = new FormData();
				body.append("file", file);
				body.append("list", JSON.stringify(list));
				return {
					method: "POST",
					url: "/contact/import",
					headers: {},
					body,
				};
			},
		}),
		getContactLists: build.query({
			query: () => {
				return {
					method: "GET",
					url: `/contact/contact-list`,
					headers: {},
				};
			},
		}),
		getContactByIds: build.query({
			query: ({ ids }) => {
				return {
					method: "GET",
					url: `/contact/ids`,
					headers: {},
					params: {
						ids,
					},
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const {
	useCreateContactMutation,
	useGetContactListQuery,
	useGetContactListsQuery,
	useImportContactsMutation,
	useUpdateContactMutation,
	useFindContactQuery,
	useGetContactByIdsQuery,
} = contactApi;
