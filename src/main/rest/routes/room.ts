import { 
	createRoomController, 
	deleteRoomController, 
	getRoomCodeController, 
	getRoomController, 
	getUserRoomCodeController 
} from "@/main/factories/presentation";
import { authUserMiddleware } from "@/main/factories/presentation/middlewares";
import { RestAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/rooms", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(createRoomController));
	router.get("/rooms/managed-room", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(getUserRoomCodeController));
	router.get("/rooms/exists/:roomCode", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(getRoomCodeController));
	router.get("/rooms/:roomCode", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(getRoomController));
	router.delete("/rooms/:roomCode", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(deleteRoomController));
};