import { 
	createResponseController, 
} from "@/main/factories/presentation";
import { authUserMiddleware } from "@/main/factories/presentation/middlewares";
import { RestAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/responses", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(createResponseController));
};