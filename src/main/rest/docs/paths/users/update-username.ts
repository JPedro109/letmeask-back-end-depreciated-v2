import { badInvalidRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const updateUsername = {
	tags: [ "Usuário" ],
	summary: "Faz a atualização do nome do usuário",
	parameters: [
		authorizationHeaderSchema,
		
		{
			in: "body",
			name: "body",
			required: true,
			schema: {
				type: "object",
				properties: {
					name: {
						type: "string"
					},
				}
			},
		},
	],
	responses: {
		
		200: {
			description: "Sucesso na atualização do nome",
			schema: {
				type: "string"
			}
		},

		400: badInvalidRequestError,

		404: notFoundError,

		401: unauthorizedError,

		500: internalServerError
	}
};