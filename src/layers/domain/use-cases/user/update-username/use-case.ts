import { InvalidUsernameError, Username } from "@/layers/domain";
import { UserRepositoryProtocol, NotFoundError } from "@/layers/domain";
import { UpdateUsernameUseCaseProtocol } from "./protocol";
import { UpdateUsernameDTO, UpdateUsernameResponseDTO } from "./dtos";

export class UpdateUsernameUseCase implements UpdateUsernameUseCaseProtocol {

	constructor(private readonly userRepository: UserRepositoryProtocol) { }

	async execute({ id, username }: UpdateUsernameDTO): Promise<UpdateUsernameResponseDTO> {
		const usernameOrError = Username.create(username);
        
		if(usernameOrError instanceof Error) return new InvalidUsernameError();

		if(!(await this.userRepository.getUserById(id))) return new NotFoundError("Usuário não existe");

		await this.userRepository.updateUserById(id, { username });

		return usernameOrError.value;
	}
}