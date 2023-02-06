import { NotFoundError, UserRepositoryProtocol } from "@/layers/use-cases";
import { GetUsernameUseCaseProtocol } from "./protocol";
import { GetUsernameDTO, GetUsernameResponseDTO } from "./dtos";

export class GetUsernameUseCase implements GetUsernameUseCaseProtocol {

	constructor(private readonly repository: UserRepositoryProtocol) { }

	async execute({ id }: GetUsernameDTO): Promise<GetUsernameResponseDTO> {
		const user = await this.repository.getUserById(id);
		
		if(!user) return new NotFoundError("Usuário não existe");

		return user.username;
	}
}