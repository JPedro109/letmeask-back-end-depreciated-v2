import { CryptographyProtocol, UserRepositoryProtocol, InvalidParamError, NotFoundError } from "@/layers/use-cases";
import { DeleteUserUseCaseProtocol } from "./protocol";
import { DeleteUserDTO, DeleteUserResponseDTO } from "./dtos";

export class DeleteUserUseCase implements DeleteUserUseCaseProtocol {

	constructor(
		private readonly repository: UserRepositoryProtocol, 
		private readonly cryptography: CryptographyProtocol
	) { }

	async execute({ id, password, passwordConfirm }: DeleteUserDTO): Promise<DeleteUserResponseDTO> {

		if(password !== passwordConfirm) return new InvalidParamError("As senhas não coincidem");

		const user = await this.repository.getUserById(id);
		
		if(!user) return new NotFoundError("Usuário não existe");

		const passwordIsEqual = await this.cryptography.compareHash(user.password, password);

		if(!passwordIsEqual) return new InvalidParamError("Senha inválida");

		await this.repository.deleteUserById(id);

		return id;
	}
}