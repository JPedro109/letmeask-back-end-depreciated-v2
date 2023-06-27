import { 
	createResponseController, 
} from "@/main/factories/presentation";
import { authenticateUserMiddleware } from "@/main/factories/presentation/middlewares";
import { ExpressAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/responses", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(createResponseController));
};