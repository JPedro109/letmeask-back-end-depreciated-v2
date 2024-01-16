import { badInvalidRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";
import { questionModel } from "@/main/rest/docs/models";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const getUserQuestions = {
	tags: [ "Pergunta" ],
	summary: "Faz o retorno das perguntas feitas pelo usuário",
	parameters: [
		authorizationHeaderSchema,
	],
	responses: {
		200: {
			description: "Sucesso no retorno das perguntas do usuário",
			schema: {
				type: "array",
				items: questionModel
			}
		},
		
		400: badInvalidRequestError,

		401: unauthorizedError,

		404: notFoundError,

		500: internalServerError
	}
};