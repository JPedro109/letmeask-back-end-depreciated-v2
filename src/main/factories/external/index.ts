import { UnitOfWorkProtocol } from "@/layers/use-cases";
import { 
	CryptographyAdapter, 
	GenerationAdapter, 
	AuthenticationAdapter,
	MailAdapter, 
	UserRepositoryAdapter,
	UserVerificationCodeRepositoryAdapter,
	RoomRepositoryAdapter,
	QuestionRepositoryAdapter,
	ResponseRepositoryAdapter,
	UnitOfWorkAdapter,
	CacheAdapter,
	LogRepositoryAdapter,
	QueueAdapter,
	LogFacade,
	LogBashAdapter,
	LogNoSQLAdapter
} from "@/layers/external";

export const cryptographyAdapter = new CryptographyAdapter();

export const queueAdapter = new QueueAdapter();

export const generationAdapter = new GenerationAdapter();

export const authenticationAdapter = new AuthenticationAdapter();

export const mailAdapter = new MailAdapter(queueAdapter);

export const userRepositoryAdapter = new UserRepositoryAdapter();

export const userVerificationCodeRepositoryAdapter = new UserVerificationCodeRepositoryAdapter();

export const roomRepositoryAdapter = new RoomRepositoryAdapter();

export const questionRepositoryAdapter = new QuestionRepositoryAdapter();

export const responseRepositoryAdapter = new ResponseRepositoryAdapter();

export const makeUnitOfWork = (): UnitOfWorkProtocol => {
	const userRepositoryAdapter = new UserRepositoryAdapter();
	const userVerificationCodeRepositoryAdapter = new UserVerificationCodeRepositoryAdapter();
	const roomRepositoryAdapter = new RoomRepositoryAdapter();
	const questionRepositoryAdapter = new QuestionRepositoryAdapter();
	const responseRepositoryAdapter = new ResponseRepositoryAdapter();

	return new UnitOfWorkAdapter(
		userRepositoryAdapter, 
		roomRepositoryAdapter, 
		questionRepositoryAdapter, 
		responseRepositoryAdapter,
		userVerificationCodeRepositoryAdapter
	);
};

export const cacheAdapter = new CacheAdapter();

export const logFacade = new LogFacade(new LogBashAdapter(), new LogNoSQLAdapter(new LogRepositoryAdapter()));