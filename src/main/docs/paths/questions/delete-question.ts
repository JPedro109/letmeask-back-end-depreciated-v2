import { badRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/docs/components";
import { questionModel } from "@/main/docs/models";
import { authorizationHeaderSchema } from "@/main/docs/schemas";

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

		400: badRequestError,

		401: unauthorizedError,

		404: notFoundError,

		500: internalServerError
	}
};