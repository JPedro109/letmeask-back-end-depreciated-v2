import { readdirSync } from "fs";
import { join } from "path";

import { Express, Router } from "express";

export const setupRest =  (app: Express): void => {
	const router = Router();
	app.use("/api", router);
	readdirSync(join(__dirname, "./routes")).map(async file => {
		if (!file.endsWith(".map")) (await import(`./routes/${file}`)).default(router);
	});
};