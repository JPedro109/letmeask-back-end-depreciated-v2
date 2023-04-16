import { badRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/docs/components";
import { responseModel } from "@/main/docs/models";
import { authorizationHeaderSchema } from "@/main/docs/schemas";

export const createResponse = {
	tags: [ "Resposta" ],
	summary: "Faz a criação de uma resposta",
	parameters: [
		authorizationHeaderSchema,
		{
			in: "body",
			name: "body",
			required: true,
			schema: {
				type: "object",
				properties: {
					questionId: {
						type: "string"
					},
					
					response: {
						type: "string"
					},
				}
			},
		},
	],
	responses: {
		201: {
			description: "Sucesso na criação da resposta",
			schema: responseModel
		},
		
		400: badRequestError,

		401: unauthorizedError,

		404: notFoundError,

		500: internalServerError
	}
};