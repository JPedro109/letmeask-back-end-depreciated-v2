import { HttpProtocol } from "@/layers/presentation";
import { Request, Response, NextFunction } from "express";

export class RestAdapter {
	static route = (route: HttpProtocol) => {
		return async (req: Request, res: Response) => {
			const { response, statusCode } = await route.handle({
				data: { ...req.body, ...req.query, ...req.params },
				userId: req.userId
			});			

			return res.status(statusCode).json(response);
		};
	};

	static middleware = (middleware: HttpProtocol) => {
		return async (req: Request, res: Response, next: NextFunction) => {
			const { response, statusCode } = await middleware.handle({
				data: { ...req.body, ...req.query, ...req.params },
				userId: req.userId,
				headers: req.headers
			});

			if(statusCode > 399 && statusCode < 500 || response instanceof Error) 
				return res.status(statusCode).json(response);			

			const userId = response;

			if(response) req.userId = userId;
		
			return next();
		};
	};
}