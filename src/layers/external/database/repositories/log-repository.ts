import { LogRepositoryProtocol, LogModel } from "@/layers/application";
import { DatabaseNoSQLHelper } from "@/layers/external";

import { WithId, Document } from "mongodb";

export class LogRepositoryAdapter implements LogRepositoryProtocol {
	private readonly collectionName: string = "letmeask-logs";
	private readonly databaseName: string = "log";

	constructor(private readonly databaseNoSQLHelper: DatabaseNoSQLHelper) { }

	private toMapperLogModel(log: WithId<Document>) {
		return new LogModel(log._id.toString(), log.level, log.title, log.message, log?.error, log?.trace);
	}

	async createLog(level: string, message: string, error?: Error, trace?: string): Promise<LogModel> {
		const logCollection = await this
			.databaseNoSQLHelper
			.getCollection(this.collectionName, this.databaseName)
			.insertOne({
				level, 
				message,
				error: {
					name: error?.name,
					message: error?.message,
					stack: error?.stack
				},
				trace,
				created_at: new Date()
			});

		const logInserted = await this
			.databaseNoSQLHelper
			.getCollection(this.collectionName, this.databaseName)
			.findOne({ _id: logCollection.insertedId });

		return this.toMapperLogModel(logInserted);
	}
}