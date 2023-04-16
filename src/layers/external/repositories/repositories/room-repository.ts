import { room as RoomPrismaModel, question as QuestionPrismaModel, response as ResponsePrismaModel } from "@prisma/client";
import { QuestionModel, ResponseModel, RoomModel, RoomRepositoryProtocol } from "@/layers/use-cases";
import { Context } from "../types";
import { DatabaseSQLHelper } from "../helpers";

export class RoomRepositoryAdapter implements RoomRepositoryProtocol {
    
	private context: Context = DatabaseSQLHelper.client;
	
	setContext(context: unknown): void {
		this.context = context as Context;
	}

	private toMapperRoomModel(room: RoomPrismaModel): RoomModel {
		return new RoomModel(room.id, room.user_id, room.code, room.name, []);
	}

	private toMapperRoomModelWithQuestions(
		room: RoomPrismaModel & {
			question: (QuestionPrismaModel & {
				response: ResponsePrismaModel;
			})[]}
	): RoomModel {
		const questions: QuestionModel[] = [];

		room?.question?.forEach(element => {
			questions.push({
				id: element.id,
				userId: element.user_id,
				roomCode: element.room_code,
				question: element.question,
				response: !element.response ? null : new ResponseModel(
					element.response.id, 
					element.response.question_id, 
					element.response.response
				)
			});
		});

		return new RoomModel(room.id, room.user_id, room.code, room.name, questions);
	}
	
	async createRoom(roomCode: string, roomName: string, userId: string): Promise<RoomModel> {
		const room = await this.context.room.create({
			data: {
				code: roomCode,
				name: roomName,
				user_id: userId
			}
		});

		return this.toMapperRoomModel(room);
	}

	async getRoomByCode(roomCode: string): Promise<RoomModel | null> {
		const room = await this.context.room.findUnique({
			where: {
				code: roomCode
			},
			include: {
				question: {
					include: {
						response: true
					}
				}
			}
		});

		if(!room?.id) return null;

		return this.toMapperRoomModelWithQuestions(room);
	}

	async getRoomByUserId(userId: string): Promise<RoomModel | null> {
		const room = await this.context.room.findUnique({
			where: {
				user_id: userId
			},
			include: {
				question: {
					include: {
						response: true
					}
				}
			}
		});

		if(!room?.id) return null;

		return this.toMapperRoomModelWithQuestions(room);
	}

	async getCodeByUserId(userId: string): Promise<string | null> {
		const room = await this.context.room.findUnique({
			where: {
				user_id: userId
			},
			select: {
				code: true
			}
		});

		if(!room?.code) return null;

		return room.code;
	}

	async roomExists(roomCode: string): Promise<boolean> {
		const room = await this.context.room.findUnique({
			where: {
				code: roomCode
			},
			select: {
				id: true
			}
		});

		if(!room?.id) return false;

		return true;
	}

	async deleteRoomByCode(roomCode: string): Promise<RoomModel> {
		const room = await this.context.room.delete({
			where: {
				code: roomCode
			},
			include: {
				question: {
					include: {
						response: true
					}
				}
			}
		});

		return this.toMapperRoomModelWithQuestions(room);
	}
}