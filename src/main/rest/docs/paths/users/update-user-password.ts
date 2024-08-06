import { badInvalidRequestError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";

import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const updateUserPassword = {
	tags: [ "Usuário" ],
	summary: "Faz a atualização da senha do usuário",
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
					
					newPassword: {
						type: "string"
					},

					newPasswordConfirm: {
						type: "string"
					},
				}
			},
		},
	],
	responses: {
		
		200: {
			description: "Sucesso na atualização da senha do usuário",
			schema: {
				type: "string"
			}
		},

		400: badInvalidRequestError,

		401: unauthorizedError,

		500: internalServerError
	}
};