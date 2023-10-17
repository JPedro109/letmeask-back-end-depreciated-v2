import { LogRepositoryProtocol, LogModel } from "@/layers/use-cases";
import { DatabaseNoSQLHelper } from "../helpers";
import { WithId, Document } from "mongodb";

export class LogRepositoryAdapter implements LogRepositoryProtocol {
	private readonly collection: string = "logletmeask";

	private toMapperLogModel(log: WithId<Document>) {
		return new LogModel(log._id.toString(), log.level, log.title, log.message, log?.trace);
	}

	async createLog(level: string, title: string, message: string, trace?: string): Promise<LogModel> {
		const logCollection = await DatabaseNoSQLHelper.getCollection(this.collection).insertOne({
			level, 
			title,
			message,
			trace,
			created_at: new Date()
		});

		const logInserted = await DatabaseNoSQLHelper
			.getCollection(this.collection)
			.findOne({ _id: logCollection.insertedId });

		return this.toMapperLogModel(logInserted);
	}
}