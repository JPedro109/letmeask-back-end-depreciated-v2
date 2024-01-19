import { DomainError, RoomEntity } from "@/layers/domain";
import { UnauthorizedError, RoomRepositoryProtocol } from "@/layers/application";
import { CreateRoomUseCaseProtocol } from "./protocol";
import { CreateRoomDTO, CreateRoomResponseDTO } from "./dtos";

export class CreateRoomUseCase implements CreateRoomUseCaseProtocol {

	constructor(
		private readonly roomRepository: RoomRepositoryProtocol
	) { }

	async execute({ userId, roomName }: CreateRoomDTO): Promise<CreateRoomResponseDTO> {
		const code = `${Math.round((Math.random() + 1) * 100000)}`;

		const validation = RoomEntity.validate(code, roomName);

		if(validation.invalid) throw new DomainError(validation.errors);

		const roomCode = await this.roomRepository.getCodeByUserId(userId);

		if(roomCode) throw new UnauthorizedError("Você já tem uma sala criada, exclua essa para poder criar outra");

		const room = await this.roomRepository.createRoom(code, roomName, userId);

		return room;
	}
}