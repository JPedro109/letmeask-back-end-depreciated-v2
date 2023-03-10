import { badRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/docs/components";
import { authorizationHeaderSchema } from "@/main/docs/schemas";

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

		400: badRequestError,

		404: notFoundError,

		401: unauthorizedError,

		500: internalServerError
	}
};