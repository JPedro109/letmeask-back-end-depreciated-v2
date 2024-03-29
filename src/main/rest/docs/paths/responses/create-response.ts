import { badInvalidRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";
import { responseModel } from "@/main/rest/docs/models";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

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
		
		400: badInvalidRequestError,

		401: unauthorizedError,

		404: notFoundError,

		500: internalServerError
	}
};