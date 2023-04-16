/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpRequest = {
	headers?: any;
	body?: any;
	query?: any;
	params?: any;
	userId?: string;
}

export type HttpResponse = {
    statusCode: number;
    response?: any;
}