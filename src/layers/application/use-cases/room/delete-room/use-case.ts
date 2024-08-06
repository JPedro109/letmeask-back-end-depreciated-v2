import { RoomCode } from "@/layers/domain";
import { 
	CacheProtocol, 
	NotFoundError, 
	RoomRepositoryProtocol, 
	UnauthorizedError
} from "@/layers/application";
import { DeleteRoomUseCaseProtocol } from "./protocol";
import { DeleteRoomDTO, DeleteRoomResponseDTO } from "./dtos";

export class DeleteRoomUseCase implements DeleteRoomUseCaseProtocol {

	constructor(
		private readonly roomRepository: RoomRepositoryProtocol,
		private readonly cache: CacheProtocol,
	) { }

	async execute({ userId, roomCode }: DeleteRoomDTO): Promise<DeleteRoomResponseDTO> {
		const roomCodeOrError = RoomCode.create(roomCode);

		if(roomCodeOrError instanceof Error) throw roomCodeOrError;

		const roomExists = await this.roomRepository.roomExists(roomCodeOrError.value);

		if(!roomExists) throw new NotFoundError("Essa sala que você quer excluir não existe");

		const databaseRoomCode = await this.roomRepository.getRoomCodeByUserId(userId);

		if(databaseRoomCode !== roomCodeOrError.value) throw new UnauthorizedError("Só o administrador pode excluir sua sala");
		
		this.cache.del(`room-${roomCodeOrError.value}`);

		return await this.roomRepository.deleteRoomByCode(roomCodeOrError.value);
	}
}