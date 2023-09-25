import { 
	createQuestionController, 
	deleteQuestionController, 
	getUserQuestionsController, 
} from "@/main/factories/presentation";
import { authenticateUserMiddleware } from "@/main/factories/presentation/middlewares";
import { RestAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/questions", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(createQuestionController));
	router.get("/questions", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(getUserQuestionsController));
	router.delete("/questions/:questionId", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(deleteQuestionController));
};