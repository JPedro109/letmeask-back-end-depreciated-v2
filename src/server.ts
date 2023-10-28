import { Metrics, PORT } from "@/shared";
import { setupServer } from "@/main/server";
import { databaseNoSQLHelper, databaseSQLHelper, queueHelper } from "./main/factories";

databaseSQLHelper.connect()
	.then(async () => {
		await databaseNoSQLHelper.connect();
		await queueHelper.connect();
		Metrics.config();
		setupServer().listen(PORT || 3333, () => console.log(`Server is running at Port ${PORT || 3333}`));
	})
	.catch(console.error);
