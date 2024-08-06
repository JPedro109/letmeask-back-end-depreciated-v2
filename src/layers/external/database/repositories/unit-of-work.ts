import { 
	UnitOfWorkProtocol, 
	UserRepositoryProtocol, 
	QuestionRepositoryProtocol, 
	ResponseRepositoryProtocol, 
	RoomRepositoryProtocol,
	UserVerificationCodeRepositoryProtocol, 
} from "@/layers/application";
import { Context, DatabaseSQLHelper } from "@/layers/external";

export class UnitOfWorkAdapter implements UnitOfWorkProtocol {
	constructor(
		private readonly databaseSQLHelper: DatabaseSQLHelper,
        private readonly userRepository: UserRepositoryProtocol,
        private readonly roomRepository: RoomRepositoryProtocol,
        private readonly questionRepository: QuestionRepositoryProtocol,
        private readonly responseRepository: ResponseRepositoryProtocol,
        private readonly userVerificationCodeRepository: UserVerificationCodeRepositoryProtocol,
	) { }

	private setContext(context: Context) {
		this.userRepository.setContext(context);
		this.roomRepository.setContext(context);
		this.questionRepository.setContext(context);
		this.responseRepository.setContext(context);
		this.userVerificationCodeRepository.setContext(context);
	}

	async transaction(querys: () => Promise<void>) {
		await this.databaseSQLHelper.client.$transaction(async context => {
			this.setContext(context);
			await querys();
		});

		this.setContext(this.databaseSQLHelper.client);
	}
    
	getUserRepository(): UserRepositoryProtocol  {
		return this.userRepository;
	}

	getRoomRepository(): RoomRepositoryProtocol  {
		return this.roomRepository;
	}

	getQuestionRepository(): QuestionRepositoryProtocol  {
		return this.questionRepository;
	}

	getResponseRepository(): ResponseRepositoryProtocol  {
		return this.responseRepository;
	}

	getUserVerificationCodeRepository(): UserVerificationCodeRepositoryProtocol {
		return this.userVerificationCodeRepository;
	}
}