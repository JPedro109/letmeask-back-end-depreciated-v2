import { DATABASE_NOSQL_URL } from "@/shared/env";
import { PrismaClient } from "@prisma/client";
import { MongoClient, Collection } from "mongodb";

export class DatabaseSQLHelper {
	static client: PrismaClient = new PrismaClient();

	static async connect(): Promise<void> {
		await DatabaseSQLHelper.client.$connect();
	}

	static async disconnect(): Promise<void> {
		await DatabaseSQLHelper.client.$disconnect();
	}
}

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