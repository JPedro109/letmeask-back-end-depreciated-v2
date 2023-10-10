import { HttpProtocol } from "@/layers/presentation";
import { GraphQLError } from "graphql";

export class GraphQLAdapter {
	static handle = async (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		route: HttpProtocol, parent: any, args: any, context: any, middlewares?: HttpProtocol[]
	) => {
    
		for(const index in middlewares) await GraphQLAdapter.middleware(middlewares[index], parent, args, context);

		let data = {};

		if(args?.data) data = { ...args.data }; 
        
		if(!args?.data) data = { ...args }; 

		const { response, statusCode } = await route.http({
			data: data,
			userId: context.userId,
			headers: context.req.headers,
			method: context.req.method,
			path: context.req.originalUrl
		});			

		if(statusCode > 399 && statusCode <= 500) throw new GraphQLError(response.message, {
			extensions: { code: response.code },
		});

		return response;
	};

	private static middleware = async (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		middleware: HttpProtocol, parent: any, args: any, context: any
	) => {

		let data = {};

		if(args?.data) data = { ...args.data }; 
        
		if(!args?.data) data = { ...args }; 

		const request = {
			data,
			userId: context.userId,
			headers: context.req.headers,
			method: context.req.method,
			path: context.req.originalUrl
		};

		const { response, statusCode } = await middleware.http(request);

		if(statusCode > 399 && statusCode <= 500) throw new GraphQLError(response.message, {
			extensions: { code: response.code },
		});	
    
		context.userId = request.userId;
	};
}