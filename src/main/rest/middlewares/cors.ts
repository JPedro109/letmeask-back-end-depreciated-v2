import { SecretsEnum } from "@/layers/use-cases";
import { secretsAdapter } from "@/main/factories";
import lib from "cors";

const allowList = [ secretsAdapter.getRequiredSecret(SecretsEnum.AppUrl) ];
const allowHosts = [ secretsAdapter.getSecret(SecretsEnum.ApiHost) ];
const allowUserAgents = [ secretsAdapter.getSecret(SecretsEnum.PrometheusUserAgent) ];

const corsOptions = (req, callback) => {
	const origin = req.header("Origin");
	const host = req.header("Host");
	const userAgent = req.header("User-Agent");
	
	if(secretsAdapter.getSecret(SecretsEnum.Environment) === "TEST") return callback(null, true);

	if (allowList.indexOf(origin) !== -1) return callback(null, true);

	if (allowHosts.indexOf(host) !== -1 && allowUserAgents.indexOf(userAgent) !== -1) return callback(null, true);

	callback(new Error("Not allowed cors"));
};

export const cors = lib(corsOptions);