import { badInvalidRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";
import { questionModel } from "@/main/rest/docs/models";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const createQuestion = {
	tags: [ "Pergunta" ],
	summary: "Faz a criação de uma pergunta",
	parameters: [
		authorizationHeaderSchema,
		
		{
			in: "body",
			name: "body",
			required: true,
			schema: {
				type: "object",
				properties: {
					roomCode: {
						type: "string"
					},
					question: {
						type: "string"
					},
				}
			},
		}
	],

	responses: {
		201: {
			description: "Sucesso na criação da pergunta",
			schema: questionModel
		},

		400: badInvalidRequestError,

		401: unauthorizedError,

		404: notFoundError,

		500: internalServerError
	}
};