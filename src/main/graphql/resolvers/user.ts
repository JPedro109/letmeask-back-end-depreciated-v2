import { ApolloAdapter } from "../adapter";
import { 
	authenticateUserMiddleware,
	createUserController,
	deleteUserController,
	getUsernameController,
	recoverUserPasswordController,
	sendUserEmailUpdateLinkController,
	sendUserPasswordRecoveryLinkController,
	updateUserEmailController,
	updateUserPasswordController,
	updateUsernameController,
	userLoginController,
	userVerifyEmailController
} from "@/main/factories";

export const userMutations = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	createUser: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(createUserController, parent, args, context),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	userVerifyEmail: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(userVerifyEmailController, parent, args, context),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	userLogin: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(userLoginController, parent, args, context),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	deleteUser: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		deleteUserController, 
		parent, 
		args, 
		context,
		[ authenticateUserMiddleware ]
	),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sendUserEmailUpdateLink: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		sendUserEmailUpdateLinkController, 
		parent, 
		args, 
		context,
		[ authenticateUserMiddleware ]
	),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sendUserPasswordRecoveryLink: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		sendUserPasswordRecoveryLinkController, 
		parent, 
		args, 
		context
	),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateUserEmail: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		updateUserEmailController, 
		parent, 
		args, 
		context,
		[ authenticateUserMiddleware ]
	),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateUsername: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		updateUsernameController, 
		parent, 
		args, 
		context,
		[ authenticateUserMiddleware ]
	),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	recoverUserPassword: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		recoverUserPasswordController, 
		parent, 
		args, 
		context
	),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateUserPassword: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		updateUserPasswordController, 
		parent, 
		args, 
		context,
		[ authenticateUserMiddleware ]
	)
};

export const userQueries = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getUsername: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		getUsernameController, 
		parent, 
		args, 
		context, 
		[ authenticateUserMiddleware ]
	) 
};