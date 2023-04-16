import { badRequestError, unauthorizedError, internalServerError } from "@/main/docs/components";
import { roomModel } from "@/main/docs/models";
import { authorizationHeaderSchema } from "@/main/docs/schemas";

export const createRoom = {
	tags: [ "Sala" ],
	summary: "Faz a criação de uma sala",
	parameters: [
		authorizationHeaderSchema,

		{
			in: "body",
			name: "body",
			required: true,
			schema: {
				type: "object",
				properties: {
					name: {
						type: "string"
					},
				}
			},
		},

	],
	responses: {
		201: {
			description: "Sucesso na criação da sala",
			schema: roomModel
		},

		400: badRequestError,

		401: unauthorizedError,

		500: internalServerError
	}
};