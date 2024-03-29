import { badInvalidRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";
import { roomModel } from "@/main/rest/docs/models";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const getRoom = {
	tags: [ "Sala" ],
	summary: "Faz o retorno de uma sala",
	parameters: [
		authorizationHeaderSchema,

		{
			in: "path",
			name: "roomCode",
			required: true
		},
	],
	responses: {
		200: {
			description: "Sucesso no retorno da sala",
			schema: roomModel
		},

		400: badInvalidRequestError,

		401: unauthorizedError,

		404: notFoundError,
		
		500: internalServerError
	}
};