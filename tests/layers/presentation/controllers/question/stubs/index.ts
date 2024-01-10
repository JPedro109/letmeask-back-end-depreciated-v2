/* eslint-disable @typescript-eslint/no-unused-vars */

import { testQuestionModel } from "../datas";
import { 
	CreateQuestionUseCaseProtocol, 
	GetUserQuestionsUseCaseProtocol, 
	DeleteQuestionUseCaseProtocol, 
	CreateQuestionDTO, 
	CreateQuestionResponseDTO,
	GetUserQuestionsDTO,
	GetUserQuestionsResponseDTO,
	DeleteQuestionDTO,
	DeleteQuestionResponseDTO
} from "@/layers/domain";

export class CreateQuestionStub implements CreateQuestionUseCaseProtocol {
	async execute({ userId, roomCode, question }: CreateQuestionDTO): Promise<CreateQuestionResponseDTO> {
		return testQuestionModel;
	}
}

export class GetUserQuestionsStub implements GetUserQuestionsUseCaseProtocol {
	async execute({ userId }: GetUserQuestionsDTO): Promise<GetUserQuestionsResponseDTO> {
		return [testQuestionModel];
	}
}

export class DeleteQuestionStub implements DeleteQuestionUseCaseProtocol {
	async execute({ userId, questionId }: DeleteQuestionDTO): Promise<DeleteQuestionResponseDTO> {
		return testQuestionModel;
	}
}