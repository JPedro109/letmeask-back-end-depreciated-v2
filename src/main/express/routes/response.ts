import { 
	createResponseController, 
} from "@/main/factories/presentation";
import { authenticateUserMiddleware } from "@/main/factories/presentation/middlewares";
import { adaptRoute, adaptMiddleware } from "@/main/express/adapters";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/responses", adaptMiddleware(authenticateUserMiddleware), adaptRoute(createResponseController));
};