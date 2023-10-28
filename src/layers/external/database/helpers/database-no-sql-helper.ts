import { DATABASE_NOSQL_URL } from "@/shared/env";
import { MongoClient, Collection } from "mongodb";

export class DatabaseNoSQLHelper {
	private client: MongoClient;

	async connect(): Promise<void> {
		this.client = await MongoClient.connect(DATABASE_NOSQL_URL);
	}

	async disconnect(): Promise<void> {
		await this.client.close();
		this.client = null;
	}

	getCollection(name: string): Collection {
		return this.client.db().collection(name);
	}
}