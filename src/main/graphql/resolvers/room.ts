import { ApolloAdapter } from "../adapter";
import { 
	authenticateUserMiddleware, 
	createRoomController, 
	deleteRoomController, 
	getRoomCodeController, 
	getRoomController, 
	getUserRoomCodeController,
} from "@/main/factories";

export const roomMutations = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	createRoom: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		createRoomController, 
		parent, 
		args, 
		context,
		[ authenticateUserMiddleware ]
	),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	deleteRoom: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		deleteRoomController, 
		parent, 
		args, 
		context, 
		[ authenticateUserMiddleware ]
	)
};

export const roomQueries = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getUserRoomCode: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		getUserRoomCodeController, 
		parent, 
		args, 
		context, 
		[ authenticateUserMiddleware ]
	),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getRoomCode: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		getRoomCodeController, 
		parent, 
		args, 
		context, 
		[ authenticateUserMiddleware ]
	),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getRoom: async (parent: any, args: any, context: any) => await ApolloAdapter.handle(
		getRoomController, 
		parent, 
		args, 
		context, 
		[ authenticateUserMiddleware ]
	) 
};