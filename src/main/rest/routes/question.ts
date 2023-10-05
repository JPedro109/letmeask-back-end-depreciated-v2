import { 
	createQuestionController, 
	deleteQuestionController, 
	getUserQuestionsController, 
} from "@/main/factories/presentation";
import { authUserMiddleware } from "@/main/factories/presentation/middlewares";
import { RestAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/questions", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(createQuestionController));
	router.get("/questions", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(getUserQuestionsController));
	router.delete("/questions/:questionId", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(deleteQuestionController));
};