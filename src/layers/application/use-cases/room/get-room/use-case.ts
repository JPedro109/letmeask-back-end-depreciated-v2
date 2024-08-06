import { RoomCode } from "@/layers/domain";
import { NotFoundError, RoomRepositoryProtocol, CacheProtocol, RoomModel } from "@/layers/application";
import { GetRoomUseCaseProtocol } from "./protocol";
import { GetRoomDTO, GetRoomResponseDTO } from "./dtos";

export class GetRoomUseCase implements GetRoomUseCaseProtocol {

	constructor(private readonly repository: RoomRepositoryProtocol, private readonly cache: CacheProtocol) { }

	async execute({ roomCode }: GetRoomDTO): Promise<GetRoomResponseDTO> {
		const roomCodeOrError = RoomCode.create(roomCode);

		if(roomCodeOrError instanceof Error) throw roomCodeOrError;

		const cachedRoom = this.cache.get<RoomModel>(`room-${roomCodeOrError.value}`);

		if(cachedRoom) return cachedRoom;

		const room = await this.repository.getRoomByRoomCode(roomCodeOrError.value);

		if(!room) throw new NotFoundError("Essa sala não existe");

		this.cache.set<RoomModel>(`room-${roomCodeOrError.value}`, room, 3600);

		return room;
	}
}