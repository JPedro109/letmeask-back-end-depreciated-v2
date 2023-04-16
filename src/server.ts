import { PORT } from "@/shared";
import { DatabaseSQLHelper, DatabaseNoSQLHelper } from "@/layers/external";
import { app } from "@/main/app";

DatabaseSQLHelper.connect()
	.then(async () => {
		DatabaseNoSQLHelper.connect()
			.then(async () => app.listen(PORT || 3333, () => console.log(`Server running at Port ${PORT || 3333}`)))
			.catch(console.error);
	})
	.catch(console.error);