import { Metrics } from "@/shared";
import { setupRest } from "@/main/rest";
import { setupGraphQL } from "@/main/graphql";
import { cors, bodyParser } from "./middlewares";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import responseTime from "response-time";

export const setupServer = () => {
	const initExpress = express();
	
	initExpress.use(cors);
	initExpress.use(bodyParser);
	initExpress.use(responseTime((req, res, time) => {
		Metrics.
			httpRequestTimer
			.labels(req.method, req.url, res.statusCode.toString())
			.observe(time / 1000);
	}));

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