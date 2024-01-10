import { RoomRepositoryProtocol } from "@/layers/domain";
import { GetUserRoomCodeUseCaseProtocol } from "./protocol";
import { GetUserRoomCodeDTO, GetUserRoomCodeResponseDTO } from "./dtos";

export class GetUserRoomCodeUseCase implements GetUserRoomCodeUseCaseProtocol {

	constructor(private readonly repository: RoomRepositoryProtocol) { }

	async execute({ userId }: GetUserRoomCodeDTO): Promise<GetUserRoomCodeResponseDTO> {

		const room = await this.repository.getCodeByUserId(userId);

		return room;
	}
}