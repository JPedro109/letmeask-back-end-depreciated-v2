import { 
	createQuestionController, 
	deleteQuestionController, 
	getUserQuestionsController, 
} from "@/main/factories/presentation";
import { authenticateUserMiddleware } from "@/main/factories/presentation/middlewares";
import { adaptRoute, adaptMiddleware } from "@/main/express/adapters";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/questions", adaptMiddleware(authenticateUserMiddleware), adaptRoute(createQuestionController));
	router.get("/questions", adaptMiddleware(authenticateUserMiddleware), adaptRoute(getUserQuestionsController));
	router.delete("/questions/:questionId", adaptMiddleware(authenticateUserMiddleware), adaptRoute(deleteQuestionController));
};