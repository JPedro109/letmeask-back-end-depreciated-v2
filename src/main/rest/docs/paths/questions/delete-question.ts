import { badInvalidRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";
import { questionModel } from "@/main/rest/docs/models";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const deleteQuestion = {
	tags: [ "Pergunta" ],
	summary: "Faz a exclusão de uma pergunta",
	parameters: [
		authorizationHeaderSchema,

		{
			in: "path",
			name: "questionId",
			required: true,
			description: "Id da pergunta",
		},
	],
	responses: {
		201: {
			description: "Sucesso na exclusão da pergunta",
			schema: questionModel
		},

		400: badInvalidRequestError,

		401: unauthorizedError,

		404: notFoundError,

		500: internalServerError
	}
};