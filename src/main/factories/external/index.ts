import { UnitOfWorkProtocol } from "@/layers/use-cases";
import { 
	CryptographyAdapter, 
	GenerationAdapter, 
	JsonWebTokenAdapter,
	MailServiceAdapter, 
	UserRepositoryAdapter,
	UserVerificationCodeRepositoryAdapter,
	RoomRepositoryAdapter,
	QuestionRepositoryAdapter,
	ResponseRepositoryAdapter,
	UnitOfWorkAdapter,
	CacheAdapter,
	LogRepositoryAdapter
} from "@/layers/external";

export const cryptographyAdapter = new CryptographyAdapter();

export const generationAdapter = new GenerationAdapter();

export const jsonWebTokenAdapter = new JsonWebTokenAdapter();

export const mailServiceAdapter = new MailServiceAdapter();

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

export const logRepositoryAdapter = new LogRepositoryAdapter();

export const cacheAdapter = new CacheAdapter();