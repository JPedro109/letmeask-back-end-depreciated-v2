import { NotFoundError, UserRepositoryProtocol } from "@/layers/application";
import { GetUsernameUseCaseProtocol } from "./protocol";
import { GetUsernameDTO, GetUsernameResponseDTO } from "./dtos";

export class GetUsernameUseCase implements GetUsernameUseCaseProtocol {

	constructor(private readonly repository: UserRepositoryProtocol) { }

	async execute({ id }: GetUsernameDTO): Promise<GetUsernameResponseDTO> {
		const user = await this.repository.getUserById(id);
		
		if(!user) throw new NotFoundError("Usuário não existe");

		return user.username;
	}
}