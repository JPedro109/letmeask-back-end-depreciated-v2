/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpRequest = {
	headers?: any;
	data?: any;
	userId?: string;
}

export type HttpResponse = {
    statusCode: number;
    response?: any;
}