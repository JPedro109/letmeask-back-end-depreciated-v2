import { Response } from "@/layers/entities";
import { 
	NotFoundError, 
	QuestionRepositoryProtocol, 
	ResponseRepositoryProtocol, 
	RoomModel, 
	RoomRepositoryProtocol, 
	UnauthorizedError, 
	UserRepositoryProtocol,
	CacheProtocol
} from "@/layers/use-cases";
import { CreateResponseUseCaseProtocol } from "./protocol";
import { CreateResponseDTO, CreateResponseResponseDTO } from "./dtos";

export class CreateResponseUseCase implements CreateResponseUseCaseProtocol {

	constructor(
        private readonly responseRepository: ResponseRepositoryProtocol, 
        private readonly userRepository: UserRepositoryProtocol,
        private readonly questionRepository: QuestionRepositoryProtocol,
        private readonly roomRepository: RoomRepositoryProtocol,
		private readonly cache: CacheProtocol
	) { }

	private async addCache(roomCode: string) {
		this.cache.del(`room-${roomCode}`);
		const room = await this.roomRepository.getRoomByCode(roomCode);
		this.cache.set<RoomModel>(`room-${roomCode}`, room, 3600);
	}

	async execute({ userId, questionId, response }: CreateResponseDTO): Promise<CreateResponseResponseDTO> {
		const responseOrError = Response.create(response);

		if(responseOrError instanceof Error) return responseOrError;

		const question = await this.questionRepository.getById(questionId);

		if(!question) return new NotFoundError("A pergunta que você quer responder não existe");

		const user = await this.userRepository.getUserById(userId);

		if(user.managedRoom !== question.roomCode) 
			return new UnauthorizedError("Só o administrador da sala pode responder perguntas");

		if(question.response) return new UnauthorizedError("Essa pergunta já tem uma resposta");

		const createdResponse = await this.responseRepository.createResponse(question.id, responseOrError.responseDescription.value);
		await this.addCache(user.managedRoom);
		return createdResponse;
	}
}