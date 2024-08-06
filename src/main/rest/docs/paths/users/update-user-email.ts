import { badInvalidRequestError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const updateUserEmail =  {
	tags: [ "Usuário" ],
	summary: "Faz a confirmação da atualização do e-mail",
	parameters: [
		authorizationHeaderSchema,
		
		{
			in: "query",
			name: "email",
			required: true,
		},

		{
			in: "query",
			name: "code",
			required: true,
		},
	],
	responses: {
		
		200: {
			description: "Sucesso na confirmação da atualização do e-mail",
			schema: {
				type: "string"
			}
		},

		400: badInvalidRequestError,

		401: unauthorizedError,

		500: internalServerError
	}
};