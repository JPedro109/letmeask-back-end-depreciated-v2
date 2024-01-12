import { NotFoundError, RoomRepositoryProtocol, CacheProtocol, RoomModel, DomainError } from "@/layers/domain";
import { RoomValidate } from "@/layers/domain";
import { GetRoomUseCaseProtocol } from "./protocol";
import { GetRoomDTO, GetRoomResponseDTO } from "./dtos";

export class GetRoomUseCase implements GetRoomUseCaseProtocol {

	constructor(private readonly repository: RoomRepositoryProtocol, private readonly cache: CacheProtocol) { }

	async execute({ roomCode }: GetRoomDTO): Promise<GetRoomResponseDTO> {
		const validaiton = RoomValidate.roomCode(roomCode);

		if(validaiton.invalid) throw new DomainError(validaiton.error);

		const cachedRoom = this.cache.get<RoomModel>(`room-${roomCode}`);

		if(cachedRoom) return cachedRoom;

		const room = await this.repository.getRoomByCode(roomCode);

		if(!room) throw new NotFoundError("Essa sala não existe");

		this.cache.set<RoomModel>(`room-${roomCode}`, room, 3600);

		return room;
	}
}