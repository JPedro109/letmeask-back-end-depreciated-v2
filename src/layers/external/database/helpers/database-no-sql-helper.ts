import { SecretsEnum, SecretsProtocol } from "@/layers/application";

import { MongoClient, Collection } from "mongodb";

export class DatabaseNoSQLHelper {
	private client: MongoClient;

	constructor(
		private readonly secrets: SecretsProtocol
	) { }

	async connect(): Promise<void> {
		this.client = await MongoClient.connect(this.secrets.getRequiredSecret(SecretsEnum.DatabaseNoSQLUrl));
	}

	async disconnect(): Promise<void> {
		await this.client.close();
		this.client = null;
	}

	getCollection(name: string, databaseName: string): Collection {
		return this.client.db(databaseName).collection(name);
	}
}