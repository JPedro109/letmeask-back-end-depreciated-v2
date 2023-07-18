import { PORT_REST } from "@/shared";
import { DatabaseSQLHelper, DatabaseNoSQLHelper, QueueHelper } from "@/layers/external";
import { setupRest } from "@/main/rest";

DatabaseSQLHelper.connect()
	.then(async () => {
		await DatabaseNoSQLHelper.connect();
		await QueueHelper.connect();
		setupRest().listen(PORT_REST || 3333, () => console.log(`Server running at Port ${PORT_REST || 3333}`));
	})
	.catch(console.error);