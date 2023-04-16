import { badRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/docs/components";
import { authorizationHeaderSchema } from "@/main/docs/schemas";

export const getRoomCode = {
	tags: [ "Sala" ],
	summary: "Faz o retorno de um booleano que identifica se a sala existe ou não",
	parameters: [
		authorizationHeaderSchema,
	],
	
	responses: {
		200: {
			description: "Sucesso no retorno de um booleano que identifica se a sala existe ou não",
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