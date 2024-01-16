import { badInvalidRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const getUserRoomCode = {
	tags: [ "Sala" ],
	summary: "Faz o retorno do código da sala do usuário",
	parameters: [
		authorizationHeaderSchema,
	],
	
	responses: {
		200: {
			description: "Sucesso no retorno do código da sala do usuário",
			schema: {
				type: "string"
			}
		},

		400: badInvalidRequestError,

		401: unauthorizedError,

		404: notFoundError,

		500: internalServerError
	}
};