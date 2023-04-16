import { badRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/docs/components";

export const sendUserPasswordRecoverLink = {
	tags: [ "Usuário" ],
	summary: "Faz o envio do link de recuperação de senha do usuário",
	parameters: [  
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

		404: notFoundError,

		401: unauthorizedError,

		500: internalServerError
	}
};