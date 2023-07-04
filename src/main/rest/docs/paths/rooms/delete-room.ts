import { badRequestError, notFoundError, unauthorizedError, internalServerError } from "@/main/rest/docs/components";
import { roomModel } from "@/main/rest/docs/models";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const deleteRoom = {
	tags: [ "Sala" ],
	summary: "Faz a exclusão de uma sala",
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
			description: "Sucesso na exclusão da sala",
			schema: roomModel
		},

		400: badRequestError,

		401: unauthorizedError,

		404: notFoundError,

		500: internalServerError
	}
};