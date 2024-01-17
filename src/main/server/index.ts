import { Metrics } from "@/shared";
import { SecretsEnum } from "@/layers/application";
import { setupRest } from "@/main/rest";
import { setupGraphQL } from "@/main/graphql";
import { secretsAdapter } from "@/main/factories";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import responseTime from "response-time";

export const setupServer = () => {
	const initExpress = express();
	
	initExpress.use(cors({
		origin: (origin, callback) => {
			const allowList = [ secretsAdapter.getRequiredSecret(SecretsEnum.AppUrl) ];
			
			if(secretsAdapter.getSecret(SecretsEnum.Environment) === "TEST") return callback(null, true);
		
			if (allowList.indexOf(origin) !== -1) return callback(null, true);
		
			callback(new Error("Not allowed cors"));
		}
	}));
	initExpress.use(express.json());
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