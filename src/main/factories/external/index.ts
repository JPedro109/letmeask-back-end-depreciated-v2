import { UnitOfWorkProtocol } from "@/layers/application";
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
	QueueHelper,
	SecretsAdapter
} from "@/layers/external";

export const secretsAdapter = new SecretsAdapter();

export const cryptographyAdapter = new CryptographyAdapter();

export const queueHelper = new QueueHelper(secretsAdapter);

export const queueAdapter = new QueueAdapter(queueHelper);

export const generationAdapter = new GenerationAdapter();

export const authenticationAdapter = new AuthenticationAdapter(secretsAdapter);

export const mailAdapter = new MailAdapter(queueAdapter, secretsAdapter);

export const databaseSQLHelper = new DatabaseSQLHelper();

export const databaseNoSQLHelper = new DatabaseNoSQLHelper(secretsAdapter);

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

export const logBashAdapter = new LogBashAdapter();

export const logFacade 
	= new LogFacade(logBashAdapter, new LogNoSQLAdapter(new LogRepositoryAdapter(databaseNoSQLHelper), logBashAdapter));