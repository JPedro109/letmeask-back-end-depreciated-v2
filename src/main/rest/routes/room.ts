import { 
	createRoomController, 
	deleteRoomController, 
	getRoomCodeController, 
	getRoomController, 
	getUserRoomCodeController 
} from "@/main/factories/presentation";
import { authenticateUserMiddleware } from "@/main/factories/presentation/middlewares";
import { ExpressAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/rooms", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(createRoomController));
	router.get("/rooms/managed-room", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(getUserRoomCodeController));
	router.get("/rooms/exists/:roomCode", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(getRoomCodeController));
	router.get("/rooms/:roomCode", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(getRoomController));
	router.delete("/rooms/:roomCode", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(deleteRoomController));
};