import { GraphQLAdapter } from "../adapter";
import { 
	authUserMiddleware, 
	createResponseController,
} from "@/main/factories";

export const responseMutations = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	createResponse: async (parent: any, args: any, context: any) => await GraphQLAdapter.handle(
		createResponseController, 
		parent, 
		args, 
		context,
		[ authUserMiddleware ]
	)
};