import { SecretsEnum } from "@/layers/application";
import { secretsAdapter } from "@/main/factories";
import lib from "cors";

const allowList = [ secretsAdapter.getRequiredSecret(SecretsEnum.AppUrl) ];

const corsOptions = {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	origin: (origin: string, callback: any) => {

		if(secretsAdapter.getSecret(SecretsEnum.Environment) === "TEST") return callback(null, true);

		if (allowList.indexOf(origin) !== -1) return callback(null, true);

		callback(new Error("Not allowed cors"));
	}
};

export const cors = lib(corsOptions);