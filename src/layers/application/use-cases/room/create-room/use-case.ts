import { RoomEntity } from "@/layers/domain";
import { UnauthorizedError, RoomRepositoryProtocol } from "@/layers/application";
import { CreateRoomUseCaseProtocol } from "./protocol";
import { CreateRoomDTO, CreateRoomResponseDTO } from "./dtos";

export class CreateRoomUseCase implements CreateRoomUseCaseProtocol {

	constructor(
		private readonly roomRepository: RoomRepositoryProtocol
	) { }

	async execute({ userId, roomName }: CreateRoomDTO): Promise<CreateRoomResponseDTO> {
		const code = `${Math.round((Math.random() + 1) * 100000)}`;

		const roomEntity = RoomEntity.create({
			roomCode: code,
			roomName
		});

		const roomCode = await this.roomRepository.getRoomCodeByUserId(userId);

		if(roomCode) throw new UnauthorizedError("Você já tem uma sala criada, exclua essa para poder criar outra");

		const room = await this.roomRepository.createRoom(roomEntity.roomCode, roomEntity.roomName, userId);

		return room;
	}
}