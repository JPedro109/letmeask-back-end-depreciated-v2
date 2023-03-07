import { 
	createRoomController, 
	deleteRoomController, 
	getRoomCodeController, 
	getRoomController, 
	getUserRoomCodeController 
} from "@/main/factories/presentation";
import { authenticateUserMiddleware } from "@/main/factories/presentation/middlewares";
import { adaptRoute, adaptMiddleware } from "@/main/express/adapters";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/rooms", adaptMiddleware(authenticateUserMiddleware), adaptRoute(createRoomController));
	router.get("/rooms/managed-room", adaptMiddleware(authenticateUserMiddleware), adaptRoute(getUserRoomCodeController));
	router.get("/rooms/exists/:roomCode", adaptMiddleware(authenticateUserMiddleware), adaptRoute(getRoomCodeController));
	router.get("/rooms/:roomCode", adaptMiddleware(authenticateUserMiddleware), adaptRoute(getRoomController));
	router.delete("/rooms/:roomCode", adaptMiddleware(authenticateUserMiddleware), adaptRoute(deleteRoomController));
};