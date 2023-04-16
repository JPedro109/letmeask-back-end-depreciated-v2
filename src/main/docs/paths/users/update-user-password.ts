import { badRequestError, unauthorizedError, internalServerError } from "@/main/docs/components";

import { authorizationHeaderSchema } from "@/main/docs/schemas";

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

		400: badRequestError,

		401: unauthorizedError,

		500: internalServerError
	}
};