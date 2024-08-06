import { ResponseModel, ResponseRepositoryProtocol } from "@/layers/application";
import { Context, DatabaseSQLHelper } from "@/layers/external";

import { response as ResponsePrismaModel } from "@prisma/client";

export class ResponseRepositoryAdapter implements ResponseRepositoryProtocol {

	constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) { }

	private context: Context = this.databaseSQLHelper.client;
	
	setContext(context: unknown): void {
		this.context = context as Context;
	}

	private toMapperResponseModel(response: ResponsePrismaModel) {
		return new ResponseModel(response.id, response.question_id, response.response);
	}

	async createResponse(questionId: string, response: string): Promise<ResponseModel> {
		const responseModel = await this.context.response.create({
			data: {
				question_id: questionId,
				response
			}
		});

		return this.toMapperResponseModel(responseModel);
	}
}