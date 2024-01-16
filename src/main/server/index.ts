import { setupRest } from "@/main/rest";
import { setupGraphQL } from "@/main/graphql";
import { cors, bodyParser } from "./middlewares";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

export const setupServer = () => {
	const initExpress = express();

	initExpress.use(cors);
	initExpress.use(bodyParser);

	setupRest(initExpress);

	setupGraphQL().then(apollo => {
		initExpress.use(
			"/graphql",
			expressMiddleware(apollo, {
				context: async ({ req }) => ({ req, userId: null })
			})
		);
	});

	return initExpress;
};