import { NotFoundError, RoomRepositoryProtocol } from "@/layers/use-cases";
import { GetRoomCodeUseCaseProtocol } from "./protocol";
import { GetRoomCodeDTO, GetRoomCodeResponseDTO } from "./dtos";

export class GetRoomCodeUseCase implements GetRoomCodeUseCaseProtocol {

	constructor(private readonly repository: RoomRepositoryProtocol) { }

	async execute({ roomCode }: GetRoomCodeDTO): Promise<GetRoomCodeResponseDTO> {

		const room = await this.repository.roomExists(roomCode);

		if(!room) return new NotFoundError("Essa sala não existe");

		return true;
	}
}