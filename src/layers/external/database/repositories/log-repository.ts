import { LogRepositoryProtocol, LogModel } from "@/layers/use-cases";
import { DatabaseNoSQLHelper } from "@/layers/external";

import { WithId, Document } from "mongodb";

export class LogRepositoryAdapter implements LogRepositoryProtocol {
	private readonly collectionName: string = "letmeask-log";
	private readonly databaseName: string = "log";

	constructor(private readonly databaseNoSQLHelper: DatabaseNoSQLHelper) { }

	private toMapperLogModel(log: WithId<Document>) {
		return new LogModel(log._id.toString(), log.level, log.title, log.message, log?.trace);
	}

	async createLog(level: string, title: string, message: string, trace?: string): Promise<LogModel> {
		const logCollection = await this.databaseNoSQLHelper.getCollection(this.collectionName, this.databaseName).insertOne({
			level, 
			title,
			message,
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