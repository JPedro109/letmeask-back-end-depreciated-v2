import { APP_URL, ENVIRONMENT } from "@/shared";
import lib from "cors";

const allowList = [ APP_URL ];

const corsOptions = {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	origin: (origin: string, callback: any) => {

		if(ENVIRONMENT === "TEST") return callback(null, true);

		if (allowList.indexOf(origin) !== -1) return callback(null, true);

		callback(new Error("Not allowed cors"));
	}
};

export const cors = lib(corsOptions);