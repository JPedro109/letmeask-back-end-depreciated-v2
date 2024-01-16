import { NotFoundError, RoomRepositoryProtocol, CacheProtocol, RoomModel } from "@/layers/use-cases";
import { RoomCode } from "@/layers/entities";
import { GetRoomUseCaseProtocol } from "./protocol";
import { GetRoomDTO, GetRoomResponseDTO } from "./dtos";

export class GetRoomUseCase implements GetRoomUseCaseProtocol {

	constructor(private readonly repository: RoomRepositoryProtocol, private readonly cache: CacheProtocol) { }

	async execute({ roomCode }: GetRoomDTO): Promise<GetRoomResponseDTO> {
		const codeOrError = RoomCode.create(roomCode);

		if(codeOrError instanceof Error) return codeOrError;

		const cachedRoom = this.cache.get<RoomModel>(`room-${roomCode}`);

		if(cachedRoom) return cachedRoom;

		const room = await this.repository.getRoomByCode(codeOrError.value);

		if(!room) return new NotFoundError("Essa sala não existe");

		this.cache.set<RoomModel>(`room-${roomCode}`, room, 3600);

		return room;
	}
}