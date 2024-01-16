import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./type-defs";
import { resolvers } from "./resolvers";

export const setupGraphQL = async () => {
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