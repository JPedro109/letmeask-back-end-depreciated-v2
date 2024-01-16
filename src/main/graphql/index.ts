import express, { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { cors, bodyParser } from "./middlewares";
import { typeDefs } from "./type-defs";
import { resolvers } from "./resolvers";

const setupApolloServer = async () => {
	const graphql = new ApolloServer({
		typeDefs,
		resolvers,
		formatError: (formattedError) => {
			return { message: formattedError.message, code: formattedError.extensions.code };
		},
	});

	await graphql.start();

	return graphql;
};

export const setupGraphQL = (server?: Express) => {
	const initExpress = server ?? express();

	setupApolloServer().then(apollo => {
		initExpress.use(
			"/graphql",
			cors,
			bodyParser,
			expressMiddleware(apollo, {
				context: async ({ req }) => ({ req, userId: null })
			})
		);
	});

	return initExpress;
};