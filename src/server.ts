import { Metrics } from "@/shared";
import { SecretsEnum } from "@/layers/domain";
import { databaseNoSQLHelper, databaseSQLHelper, queueHelper, secretsAdapter } from "@/main/factories";
import { setupServer } from "@/main/server";

const port = parseInt(secretsAdapter.getSecret(SecretsEnum.Port));

databaseSQLHelper.connect()
	.then(async () => {
		await databaseNoSQLHelper.connect();
		await queueHelper.connect();
		Metrics.config();
		setupServer().listen(port || 3333, () => console.log(`Server is running at Port ${port || 3333}`));
	})
	.catch(console.error);
