import { HttpResponse, InternalServerError } from "@/layers/presentation";

export const ok = (data: unknown): HttpResponse => ({
	statusCode: 200,
	response: data
});

export const created = (data: unknown): HttpResponse => ({
	statusCode: 201,
	response: data
});

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	response: {
		message: error.message,
		code: error.name
	}
});

export const unauthorized = (error: Error): HttpResponse => ({
	statusCode: 401,
	response: {
		message: error.message,
		code: error.name
	}
});

export const notFound = (error: Error): HttpResponse => ({
	statusCode: 404,
	response: {
		message: error.message,
		code: error.name
	}
});

export const server = (error: Error = new InternalServerError()): HttpResponse => ({
	statusCode: 500,
	response: {
		message: error.message,
		code: error.name
	}
});