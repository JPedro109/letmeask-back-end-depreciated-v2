import { readdirSync } from "fs";
import { join } from "path";

import express, { Express, Router } from "express";

import { bodyParser, cors } from "./middlewares";

const setupRoutes =  (app: Express): void => {
	const router = Router();
	app.use("/api", router);
	readdirSync(join(__dirname, "./routes")).map(async file => {
		if (!file.endsWith(".map")) (await import(`./routes/${file}`)).default(router);
	});
};

export const setupRest = (server?: Express) => {
	const initExpress =  server ?? express();

	initExpress.use(bodyParser);
	initExpress.use(cors);
	setupRoutes(initExpress);

	return initExpress;
};