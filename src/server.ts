import { Metrics, PORT } from "@/shared";
import { DatabaseSQLHelper, DatabaseNoSQLHelper, QueueHelper } from "@/layers/external";
import { setupServer } from "@/main/server";

DatabaseSQLHelper.connect()
	.then(async () => {
		await DatabaseNoSQLHelper.connect();
		await QueueHelper.connect();
		Metrics.config();
		setupServer().listen(PORT || 3333, () => console.log(`Server is running at Port ${PORT || 3333}`));
	})
	.catch(console.error);
