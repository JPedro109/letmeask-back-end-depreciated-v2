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
			userId: context.userId
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

		const { response, statusCode } = await middleware.http({
			data,
			userId: context.userId,
			headers: context.headers
		});

		if(statusCode > 399 && statusCode <= 500) throw new GraphQLError(response.message, {
			extensions: { code: response.code },
		});	
    
		const userId = response;
    
		if(response) context.userId = userId;
	};
}