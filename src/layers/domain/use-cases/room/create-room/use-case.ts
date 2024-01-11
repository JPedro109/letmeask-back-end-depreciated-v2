import { Room } from "@/layers/domain";
import { UnitOfWorkProtocol, UnauthorizedError, RoomModel } from "@/layers/domain";
import { CreateRoomUseCaseProtocol } from "./protocol";
import { CreateRoomDTO, CreateRoomResponseDTO } from "./dtos";

export class CreateRoomUseCase implements CreateRoomUseCaseProtocol {

	constructor(
		private readonly unitOfWork: UnitOfWorkProtocol
	) { }

	async execute({ userId, roomName }: CreateRoomDTO): Promise<CreateRoomResponseDTO> {
		const userRepository = this.unitOfWork.getUserRepository();
		const roomRepository = this.unitOfWork.getRoomRepository();

		const code = `${Math.round((Math.random() + 1) * 100000)}`;

		const roomOrError = Room.create(code, roomName);

		if(roomOrError instanceof Error) throw roomOrError;

		const user = await userRepository.getUserById(userId);

		if(user.managedRoom) throw new UnauthorizedError("Você já tem uma sala criada, exclua essa para poder criar outra");

		let room: RoomModel;

		await this.unitOfWork.transaction(async () => {
			await userRepository.updateUserById(userId, { managedRoom: code });
			room = await roomRepository.createRoom(roomOrError.roomCode.value, roomOrError.roomName.value, userId);
		});

		return room;
	}
}