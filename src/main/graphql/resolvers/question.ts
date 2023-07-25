import { ApolloAdapter } from "../adapter";
import { 
	authenticateUserMiddleware, 
	createQuestionController, 
	deleteQuestionController, 
	getUserQuestionsController 
} from "@/main/factories";

export const questionMutations = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	createQuestion: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		createQuestionController, 
		parent, 
		args, 
		context,
		[ authenticateUserMiddleware ]
	),

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	deleteQuestion: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		deleteQuestionController, 
		parent, 
		args, 
		context, 
		[ authenticateUserMiddleware ]
	)
};

export const questionQueries = {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getUserQuestions: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		getUserQuestionsController, 
		parent, 
		args, 
		context, 
		[ authenticateUserMiddleware ]
	)
};