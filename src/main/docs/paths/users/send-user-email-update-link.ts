import { badRequestError, unauthorizedError, internalServerError } from "@/main/docs/components";
import { authorizationHeaderSchema } from "@/main/docs/schemas";

export const sendUserEmailUpdateLink = {
	tags: [ "Usuário" ],
	summary: "Faz o envio do link de confirmação de atualização de email",
	parameters: [
		authorizationHeaderSchema,
		
		{
			in: "body",
			name: "body",
			required: true,
			schema: {
				type: "object",
				properties: {
					email: {
						type: "string"
					}
				}
			}
		},
	],
	responses: {
		
		200: {
			description: "Sucesso no envio do link",
			schema: {
				type: "string"
			}
		},

		400: badRequestError,

		401: unauthorizedError,

		500: internalServerError
	}
};