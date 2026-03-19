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
		getPaginatedContactList: build.query({
			query: ({ list, page = 1, limit = 20 }) => {
				return {
					method: "GET",
					url: `/contact/list/${list}?page=${page}&limit=${limit}`,
					headers: {},
				};
			},
			serializeQueryArgs: ({ queryArgs }) => {
				return { list: queryArgs.list };
			},
			merge: (currentCache, newItems) => {
				if (newItems.page === 1) {
					return newItems;
				}
				currentCache.contacts.push(...newItems.contacts);
				currentCache.page = newItems.page;
				currentCache.totalPages = newItems.totalPages;
				currentCache.total = newItems.total;
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.page !== previousArg?.page || currentArg?.list !== previousArg?.list;
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
					method: "POST",
					url: `/contact/ids`,
					headers: {},
					body: {
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
	useGetPaginatedContactListQuery,
	useGetContactListsQuery,
	useImportContactsMutation,
	useUpdateContactMutation,
	useFindContactQuery,
	useGetContactByIdsQuery,
} = contactApi;
