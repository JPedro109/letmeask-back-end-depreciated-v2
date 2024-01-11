import { RoomCode } from "@/layers/domain";
import { CacheProtocol, NotFoundError, RoomRepositoryProtocol, UnauthorizedError, UserRepositoryProtocol } from "@/layers/domain";
import { DeleteRoomUseCaseProtocol } from "./protocol";
import { DeleteRoomDTO, DeleteRoomResponseDTO } from "./dtos";

export class DeleteRoomUseCase implements DeleteRoomUseCaseProtocol {

	constructor(
		private readonly roomRepository: RoomRepositoryProtocol,
		private readonly userRepository: UserRepositoryProtocol,
		private readonly cache: CacheProtocol,
	) { }

	async execute({ userId, roomCode }: DeleteRoomDTO): Promise<DeleteRoomResponseDTO> {
		const codeOrError = RoomCode.create(roomCode);

		if(codeOrError instanceof Error) throw codeOrError;

		const roomExists = await this.roomRepository.roomExists(roomCode);

		if(!roomExists) throw new NotFoundError("Essa sala que você quer excluir não existe");

		const databaseRoomCode = await this.roomRepository.getCodeByUserId(userId);

		if(databaseRoomCode !== roomCode) throw new UnauthorizedError("Só o administrador pode excluir sua sala");
		
		await this.userRepository.updateUserById(userId, { managedRoom: null });

		this.cache.del(`room-${roomCode}`);

		return await this.roomRepository.deleteRoomByCode(codeOrError.value);
	}
}