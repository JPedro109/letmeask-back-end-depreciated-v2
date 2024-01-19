import { DomainError, RoomValidate } from "@/layers/domain";
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
		const validaiton = RoomValidate.roomCode(roomCode);

		if(validaiton.invalid) throw new DomainError(validaiton.error);

		const roomExists = await this.roomRepository.roomExists(roomCode);

		if(!roomExists) throw new NotFoundError("Essa sala que você quer excluir não existe");

		const databaseRoomCode = await this.roomRepository.getRoomCodeByUserId(userId);

		if(databaseRoomCode !== roomCode) throw new UnauthorizedError("Só o administrador pode excluir sua sala");
		
		this.cache.del(`room-${roomCode}`);

		return await this.roomRepository.deleteRoomByCode(roomCode);
	}
}