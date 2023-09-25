import { badRequestError, notFoundError, internalServerError } from "@/main/rest/docs/components";

export const recoverUserPassword = {
	tags: [ "Usuário" ],
	summary: "Faz a recuperação da senha do usuário",
	parameters: [  
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
			description: "Sucesso na recuperação da senha",
			schema: {
				type: "string"
			}
		},

		400: badRequestError,

		404: notFoundError,

		500: internalServerError
	}
};