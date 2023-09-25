import { badRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";

export const verifyUserEmail = {
	tags: [ "Usuário" ],
	summary: "Faz a confirmação de que e-mail do usuário existe",
	parameters: [  
		{
			in: "query",
			name: "email",
			required: true
		},

		{
			in: "query",
			name: "code",
			required: true
		},
	],
	responses: {
		
		200: {
			description: "Sucesso na confirmação do e-mail",
			schema: {
				type: "string"
			}
		},

		400: badRequestError,

		401: unauthorizedError,

		404: notFoundError,

		500: internalServerError
	}
};