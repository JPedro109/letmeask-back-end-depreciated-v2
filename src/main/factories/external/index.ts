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
	LogNoSQLAdapter,
	DatabaseSQLHelper,
	DatabaseNoSQLHelper,
	QueueHelper
} from "@/layers/external";

export const cryptographyAdapter = new CryptographyAdapter();

export const queueHelper = new QueueHelper();

export const queueAdapter = new QueueAdapter(queueHelper);

export const generationAdapter = new GenerationAdapter();

export const authenticationAdapter = new AuthenticationAdapter();

export const mailAdapter = new MailAdapter(queueAdapter);

export const databaseSQLHelper = new DatabaseSQLHelper();

export const databaseNoSQLHelper = new DatabaseNoSQLHelper();

export const userRepositoryAdapter = new UserRepositoryAdapter(databaseSQLHelper);

export const userVerificationCodeRepositoryAdapter = new UserVerificationCodeRepositoryAdapter(databaseSQLHelper);

export const roomRepositoryAdapter = new RoomRepositoryAdapter(databaseSQLHelper);

export const questionRepositoryAdapter = new QuestionRepositoryAdapter(databaseSQLHelper);

export const responseRepositoryAdapter = new ResponseRepositoryAdapter(databaseSQLHelper);

export const makeUnitOfWork = (): UnitOfWorkProtocol => {
	const userRepositoryAdapter = new UserRepositoryAdapter(databaseSQLHelper);
	const userVerificationCodeRepositoryAdapter = new UserVerificationCodeRepositoryAdapter(databaseSQLHelper);
	const roomRepositoryAdapter = new RoomRepositoryAdapter(databaseSQLHelper);
	const questionRepositoryAdapter = new QuestionRepositoryAdapter(databaseSQLHelper);
	const responseRepositoryAdapter = new ResponseRepositoryAdapter(databaseSQLHelper);

	return new UnitOfWorkAdapter(
		databaseSQLHelper,
		userRepositoryAdapter, 
		roomRepositoryAdapter, 
		questionRepositoryAdapter, 
		responseRepositoryAdapter,
		userVerificationCodeRepositoryAdapter
	);
};

export const cacheAdapter = new CacheAdapter();

export const logFacade = new LogFacade(new LogBashAdapter(), new LogNoSQLAdapter(new LogRepositoryAdapter(databaseNoSQLHelper)));