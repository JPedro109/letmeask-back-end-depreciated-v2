import { badRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/docs/components";
import { questionModel } from "@/main/docs/models";
import { authorizationHeaderSchema } from "@/main/docs/schemas";

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

		400: badRequestError,

		401: unauthorizedError,

		404: notFoundError,

		500: internalServerError
	}
};