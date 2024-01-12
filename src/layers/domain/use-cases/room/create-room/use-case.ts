import { DomainError, RoomEntity } from "@/layers/domain";
import { UnitOfWorkProtocol, UnauthorizedError, RoomModel } from "@/layers/domain";
import { CreateRoomUseCaseProtocol } from "./protocol";
import { CreateRoomDTO, CreateRoomResponseDTO } from "./dtos";

export class CreateRoomUseCase implements CreateRoomUseCaseProtocol {

	constructor(
		private readonly unitOfWork: UnitOfWorkProtocol
	) { }

	async execute({ userId, roomName }: CreateRoomDTO): Promise<CreateRoomResponseDTO> {
		const code = `${Math.round((Math.random() + 1) * 100000)}`;

		const validation = RoomEntity.validate(code, roomName);

		if(validation.invalid) throw new DomainError(validation.errors);

		const userRepository = this.unitOfWork.getUserRepository();
		const roomRepository = this.unitOfWork.getRoomRepository();

		const user = await userRepository.getUserById(userId);

		if(user.managedRoom) throw new UnauthorizedError("Você já tem uma sala criada, exclua essa para poder criar outra");

		let room: RoomModel;

		await this.unitOfWork.transaction(async () => {
			await userRepository.updateUserById(userId, { managedRoom: code });
			room = await roomRepository.createRoom(code, roomName, userId);
		});

		return room;
	}
}