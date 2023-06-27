import { 
	createQuestionController, 
	deleteQuestionController, 
	getUserQuestionsController, 
} from "@/main/factories/presentation";
import { authenticateUserMiddleware } from "@/main/factories/presentation/middlewares";
import { ExpressAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/questions", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(createQuestionController));
	router.get("/questions", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(getUserQuestionsController));
	router.delete("/questions/:questionId", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(deleteQuestionController));
};