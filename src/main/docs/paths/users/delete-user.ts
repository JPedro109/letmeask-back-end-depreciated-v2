import { badRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/docs/components";
import { authorizationHeaderSchema } from "@/main/docs/schemas";

export const deleteUser = {
	tags: [ "Usuário" ],
	summary: "Faz a exclusão do usuário",
	parameters: [
		authorizationHeaderSchema,
		
		{
			in: "body",
			name: "body",
			required: true,
			schema: {
				type: "object",
				properties: {
					password: {
						type: "string"
					},

					passwordConfirm: {
						type: "string"
					},
				}
			},
		},
	],
	responses: {
		
		200: {
			description: "Sucesso na exclusão do usuário",
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