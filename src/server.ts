import { PORT_REST, PORT_GRAPHQL } from "@/shared";
import { DatabaseSQLHelper, DatabaseNoSQLHelper, QueueHelper } from "@/layers/external";
import { setupRest } from "@/main/rest";
import { setupGraphQL } from "@/main/graphql";

DatabaseSQLHelper.connect()
	.then(async () => {
		await DatabaseNoSQLHelper.connect();
		await QueueHelper.connect();
		setupRest().listen(PORT_REST || 3333, () => console.log(`Server rest is running at Port ${PORT_REST || 3333}`));
		setupGraphQL().listen(PORT_GRAPHQL || 4000, () => console.log(`Server graphql is running at Port ${PORT_GRAPHQL || 4000}`));
	})
	.catch(console.error);