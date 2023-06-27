import { PORT } from "@/shared";
import { DatabaseSQLHelper, DatabaseNoSQLHelper, QueueHelper } from "@/layers/external";
import { setupExpress } from "@/main/express";

DatabaseSQLHelper.connect()
	.then(async () => {
		await DatabaseNoSQLHelper.connect();
		await QueueHelper.connect();
		setupExpress().listen(PORT || 3333, () => console.log(`Server running at Port ${PORT || 3333}`));
	})
	.catch(console.error);