import { LogRepositoryProtocol, LogModel } from "@/layers/use-cases";
import { DatabaseNoSQLHelper } from "../helpers";
import { WithId, Document } from "mongodb";

export class LogRepositoryAdapter implements LogRepositoryProtocol {
	private readonly collection: string = "logletmeask";

	private toMapperLogModel(log: WithId<Document>) {
		return new LogModel(log._id.toString(), log.message, log.stack, log.name);
	}

	async createLog(message: string, stack: string, name: string): Promise<LogModel> {
		const logCollection = await DatabaseNoSQLHelper.getCollection(this.collection).insertOne({
			message,
			stack,
			name,
			created_at: new Date()
		});

		const logInserted = await DatabaseNoSQLHelper
			.getCollection(this.collection)
			.findOne({ _id: logCollection.insertedId });

		return this.toMapperLogModel(logInserted);
	}
}