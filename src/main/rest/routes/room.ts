import { 
	createRoomController, 
	deleteRoomController, 
	getRoomCodeController, 
	getRoomController, 
	getUserRoomCodeController 
} from "@/main/factories/presentation";
import { authenticateUserMiddleware } from "@/main/factories/presentation/middlewares";
import { RestAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/rooms", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(createRoomController));
	router.get("/rooms/managed-room", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(getUserRoomCodeController));
	router.get("/rooms/exists/:roomCode", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(getRoomCodeController));
	router.get("/rooms/:roomCode", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(getRoomController));
	router.delete("/rooms/:roomCode", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(deleteRoomController));
};