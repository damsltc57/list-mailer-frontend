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
		getContactList: build.query({
			query: () => {
				return {
					method: "GET",
					url: `/contact/list`,
					headers: {},
				};
			},
		}),
	}),
	overrideExisting: true,
});

export const { useCreateContactMutation, useGetContactListQuery } = contactApi;
