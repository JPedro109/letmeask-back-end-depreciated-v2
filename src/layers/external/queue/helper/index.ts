import { QUEUE_HOST } from "@/shared";
import { Channel, Connection, connect } from "amqplib";

export class QueueHelper {

	private connection: Connection | null = null;
	public channel: Channel;

	async connect(): Promise<void> {
		if (!this.connection) {
			this.connection = await connect(QUEUE_HOST);
			this.channel = await this.connection.createChannel();
		}
	}

	async disconnect(): Promise<void> {
		await this.connection?.close();
		this.connection = null;
	}
}