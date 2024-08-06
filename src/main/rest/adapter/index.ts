import { HttpProtocol } from "@/layers/presentation";
import { Request, Response, NextFunction } from "express";

export class RestAdapter {
	static route = (route: HttpProtocol) => {
		return async (req: Request, res: Response) => {
			const { response, statusCode } = await route.http({
				data: { ...req.body, ...req.query, ...req.params },
				userId: req.userId,
				headers: req.headers,
				method: req.method,
				path: req.originalUrl
			});			

			if(statusCode === 204) return res.status(statusCode).json();

			return res.status(statusCode).json(response);
		};
	};

	static middleware = (middleware: HttpProtocol) => {
		return async (req: Request, res: Response, next: NextFunction) => {
			const request = {
				data: { ...req.body, ...req.query, ...req.params },
				userId: req.userId,
				headers: req.headers,
				method: req.method,
				path: req.originalUrl
			};

			const { response, statusCode } = await middleware.http(request);

			if(statusCode > 399 && statusCode <= 500) return res.status(statusCode).json(response);			

			req.userId = request.userId;

			return next();
		};
	};
}