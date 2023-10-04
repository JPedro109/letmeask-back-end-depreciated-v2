import { PrismaClient } from "@prisma/client";

export class DatabaseSQLHelper {
	static client: PrismaClient = new PrismaClient();

	static async connect(): Promise<void> {
		await DatabaseSQLHelper.client.$connect();
	}

	static async disconnect(): Promise<void> {
		await DatabaseSQLHelper.client.$disconnect();
	}
}