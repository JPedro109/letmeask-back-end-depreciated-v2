import { SecretsEnum } from "@/layers/use-cases";
import { secretsAdapter } from "@/main/factories";
import lib from "cors";

const allowList = [ secretsAdapter.getRequiredSecret(SecretsEnum.AppUrl) ];

const corsOptions = (req, callback) => {
	const origin = req.header("Origin");
	
	if(secretsAdapter.getSecret(SecretsEnum.Environment) === "TEST") return callback(null, true);

	if (allowList.indexOf(origin) !== -1) return callback(null, true);

	callback(new Error("Not allowed cors"));
};

export const cors = lib(corsOptions);