import { userMutations, userQueries } from "./user";
import { roomMutations, roomQueries } from "./room";
import { questionMutations, questionQueries } from "./question";
import { responseMutations } from "./response";

export const resolvers = {
	Mutation: {
		...userMutations,
		...roomMutations,
		...questionMutations,
		...responseMutations
	},
	Query: {
		...userQueries,
		...roomQueries,
		...questionQueries
	}
};