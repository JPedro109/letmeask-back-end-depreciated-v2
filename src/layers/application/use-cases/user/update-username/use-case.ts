import { DomainError, UserValidate } from "@/layers/domain";
import { UserRepositoryProtocol, NotFoundError } from "@/layers/application";
import { UpdateUsernameUseCaseProtocol } from "./protocol";
import { UpdateUsernameDTO, UpdateUsernameResponseDTO } from "./dtos";

export class UpdateUsernameUseCase implements UpdateUsernameUseCaseProtocol {

	constructor(private readonly userRepository: UserRepositoryProtocol) { }

	async execute({ id, username }: UpdateUsernameDTO): Promise<UpdateUsernameResponseDTO> {
		const validation = UserValidate.username(username);

		if(validation.invalid) throw new DomainError(validation.error);

		if(!(await this.userRepository.getUserById(id))) throw new NotFoundError("Usuário não existe");

		await this.userRepository.updateUserById(id, { username });

		return username;
	}
}