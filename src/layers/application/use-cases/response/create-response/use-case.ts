import { DomainError, ResponseEntity } from "@/layers/domain";
import { 
	NotFoundError, 
	QuestionRepositoryProtocol, 
	ResponseRepositoryProtocol, 
	RoomModel, 
	RoomRepositoryProtocol, 
	UnauthorizedError, 
	CacheProtocol
} from "@/layers/application";
import { CreateResponseUseCaseProtocol } from "./protocol";
import { CreateResponseDTO, CreateResponseResponseDTO } from "./dtos";

export class CreateResponseUseCase implements CreateResponseUseCaseProtocol {

	constructor(
        private readonly responseRepository: ResponseRepositoryProtocol, 
        private readonly questionRepository: QuestionRepositoryProtocol,
        private readonly roomRepository: RoomRepositoryProtocol,
		private readonly cache: CacheProtocol
	) { }

	private async addCache(roomCode: string) {
		this.cache.del(`room-${roomCode}`);
		const room = await this.roomRepository.getRoomByRoomCode(roomCode);
		this.cache.set<RoomModel>(`room-${roomCode}`, room, 3600);
	}

	async execute({ userId, questionId, response }: CreateResponseDTO): Promise<CreateResponseResponseDTO> {
		const validation = ResponseEntity.validate(response);

		if(validation.invalid) throw new DomainError(validation.errors);

		const question = await this.questionRepository.getQuestionById(questionId);

		if(!question) throw new NotFoundError("A pergunta que você quer responder não existe");

		const roomCode = await this.roomRepository.getRoomCodeByUserId(userId);

		if(roomCode !== question.roomCode) 
			throw new UnauthorizedError("Só o administrador da sala pode responder perguntas");

		if(question.response) throw new UnauthorizedError("Essa pergunta já tem uma resposta");

		const createdResponse = await this.responseRepository.createResponse(question.id, response);
		await this.addCache(roomCode);
		return createdResponse;
	}
}