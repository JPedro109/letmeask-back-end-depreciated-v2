import { question as QuestionPrismaModel, response as ResponsePrismaModel } from "@prisma/client";
import { QuestionRepositoryProtocol, QuestionModel, ResponseModel } from "@/layers/use-cases";
import { Context } from "../types";
import { DatabaseSQLHelper } from "../helpers";

export class QuestionRepositoryAdapter implements QuestionRepositoryProtocol {
	
	constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) { }

	private context: Context = this.databaseSQLHelper.client;
	setContext(context: unknown): void {
		this.context = context as Context;
	}
	
	private toMapperQuestionModel(question: QuestionPrismaModel) {
		return new QuestionModel(
			question.id, 
			question.user_id,
			question.room_code, 
			question.question, 
			null
		); 
	}
	
	private toMapperQuestionModelWithResponse(question: QuestionPrismaModel & {
		response: ResponsePrismaModel;
	}) {
		return new QuestionModel(
			question.id, 
			question.user_id,
			question.room_code, 
			question.question, 
			question.response ? new ResponseModel(
				question.response.id, 
				question.response.question_id, 
				question.response.response
			) : null
		); 
	}

	async store(roomCode: string, question: string, userId: string): Promise<QuestionModel> {
		const questionModel = await this.context.question.create({
			data: {
				room_code: roomCode,
				question,
				user_id: userId
			}
		});

		return this.toMapperQuestionModel(questionModel);
	}

	async getById(id: string): Promise<QuestionModel | null> {
		const question = await this.context.question.findUnique({
			where: {
				id
			},
			include: {
				response: true
			}
		});

		if(!question) return null;

		return this.toMapperQuestionModelWithResponse(question);
	}

	async getRoomByUserId(userId: string): Promise<QuestionModel[]> {
		const questions = await this.context.question.findMany({
			where: {
				user_id: userId
			},
			include: {
				response: true
			}
		});

		const questionsModels: QuestionModel[] = [];

		questions.forEach(element => questionsModels.push(this.toMapperQuestionModelWithResponse(element)));

		return questionsModels;
	}

	async deleteQuestionById(id: string): Promise<QuestionModel> {
		const question = await this.context.question.delete({
			where: {
				id
			},
			include: {
				response: true
			}
		});

		return this.toMapperQuestionModelWithResponse(question);
	}
}