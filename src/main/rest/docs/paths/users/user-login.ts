import { badInvalidRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";

export const userLogin =  {
	tags: [ "Usuário" ],
	summary: "Faz o login do usuário",
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
					},
					
					password: {
						type: "string"
					},	
				}
			}
		},
	],
	responses: {
		
		200: {
			description: "Sucesso na autentificação do usuário",
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