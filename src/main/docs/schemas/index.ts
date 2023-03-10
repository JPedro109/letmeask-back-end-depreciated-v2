export const errorSchema = {
	type:"object",
	properties: {
		message: {
			type: "string"
		},
		code: {
			type: "string"
		}
	}
};

export const authorizationHeaderSchema = {
	in: "header",
	name: "Authorization",
	required: true,
	description: "Código de Autentificação",
	example: "Bearer token"
};