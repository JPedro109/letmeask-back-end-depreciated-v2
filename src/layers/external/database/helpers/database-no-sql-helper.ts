import { DATABASE_NOSQL_URL } from "@/shared/env";
import { MongoClient, Collection } from "mongodb";

export class DatabaseNoSQLHelper {
	static client: MongoClient;

	static async connect (): Promise<void> {
		DatabaseNoSQLHelper.client = await MongoClient.connect(DATABASE_NOSQL_URL);
	}

	static async disconnect (): Promise<void> {
		await DatabaseNoSQLHelper.client.close();
		DatabaseNoSQLHelper.client = null;
	}

	static getCollection (name: string): Collection {
		return DatabaseNoSQLHelper.client.db().collection(name);
	}
}