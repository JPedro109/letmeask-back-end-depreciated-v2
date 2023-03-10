import { errorSchema } from "../schemas";

export const badRequestError = {
	description: "Erro do usuário",
	schema: errorSchema
};

export const unauthorizedError = {
	description: "Erro de autorização",
	schema: errorSchema
};

export const notFoundError = {
	description: "Erro de dado não encontrado",
	schema: errorSchema
};

export const internalServerError = {
	description: "Erro no servidor",
	schema: errorSchema
};