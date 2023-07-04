import { badRequestError, internalServerError } from "@/main/rest/docs/components";

export const createUser = {
	tags: [ "Usuário" ],
	summary: "Faz a criação de um usuário",
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

					username: {
						type: "string"
					},

					password: {
						type: "string"
					},

					passwordConfirm: {
						type: "string"
					}
				}
			}
		},
	],
	responses: {
		
		201: {
			description: "Sucesso na criação",
			schema: {
				type: "string"
			}
		},

		400: badRequestError,

		500: internalServerError
	}
};