import { userRepositoryAdapter, roomRepositoryAdapter, questionRepositoryAdapter, cacheAdapter } from "@/main/factories";
import { CreateQuestionUseCase, GetUserQuestionsUseCase, DeleteQuestionUseCase } from "@/layers/application";

export const createQuestion = new CreateQuestionUseCase(
	questionRepositoryAdapter, 
	roomRepositoryAdapter, 
	userRepositoryAdapter,
	cacheAdapter
);

export const getUserQuestions = new GetUserQuestionsUseCase(questionRepositoryAdapter);

export const deleteQuestion = new DeleteQuestionUseCase(questionRepositoryAdapter, roomRepositoryAdapter, cacheAdapter);