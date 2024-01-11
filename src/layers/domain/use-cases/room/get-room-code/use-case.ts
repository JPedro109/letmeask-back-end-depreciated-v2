import { NotFoundError, RoomRepositoryProtocol } from "@/layers/domain";
import { GetRoomCodeUseCaseProtocol } from "./protocol";
import { GetRoomCodeDTO, GetRoomCodeResponseDTO } from "./dtos";

export class GetRoomCodeUseCase implements GetRoomCodeUseCaseProtocol {

	constructor(private readonly repository: RoomRepositoryProtocol) { }

	async execute({ roomCode }: GetRoomCodeDTO): Promise<GetRoomCodeResponseDTO> {

		const room = await this.repository.roomExists(roomCode);

		if(!room) throw new NotFoundError("Essa sala não existe");

		return true;
	}
}