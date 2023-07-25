import { ApolloAdapter } from "../adapter";
import { 
	authenticateUserMiddleware, 
	createResponseController,
} from "@/main/factories";

export const responseMutations = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	createResponse: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		createResponseController, 
		parent, 
		args, 
		context,
		[ authenticateUserMiddleware ]
	)
};