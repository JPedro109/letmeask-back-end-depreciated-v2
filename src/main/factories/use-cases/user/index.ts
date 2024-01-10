import { 
	CreateUserUseCase, 
	DeleteUserUseCase, 
	GetUsernameUseCase, 
	RecoverUserPasswordUseCase, 
	SendUserEmailUpdateLinkUseCase, 
	SendUserPasswordRecoveryLinkUseCase, 
	UpdateUserEmailUseCase, 
	UpdateUserPasswordUseCase, 
	UpdateUsernameUseCase, 
	UserLoginUseCase,
	UserVerifyEmailUseCase, 
} from "@/layers/domain";
import { 
	cryptographyAdapter, 
	generationAdapter, 
	authenticationAdapter, 
	mailAdapter, 
	makeUnitOfWork, 
	userRepositoryAdapter, 
	userVerificationCodeRepositoryAdapter,
	secretsAdapter
} from "@/main/factories";

export const createUser = new CreateUserUseCase(
	makeUnitOfWork(), 
	mailAdapter, 
	cryptographyAdapter, 
	generationAdapter,
	secretsAdapter
);

export const deleteUser = new DeleteUserUseCase(userRepositoryAdapter, cryptographyAdapter);

export const getUsername = new GetUsernameUseCase(userRepositoryAdapter);

export const recoverUserPassword = new RecoverUserPasswordUseCase(makeUnitOfWork(), cryptographyAdapter);

export const sendUserEmailUpdateLink = new SendUserEmailUpdateLinkUseCase(
	userRepositoryAdapter, 
	userVerificationCodeRepositoryAdapter,
	generationAdapter, 
	mailAdapter,
	secretsAdapter
);

export const sendUserPasswordRecoveryLink = new SendUserPasswordRecoveryLinkUseCase(
	userRepositoryAdapter, 
	userVerificationCodeRepositoryAdapter,
	generationAdapter, 
	mailAdapter,
	secretsAdapter
);

export const updateUserEmail = new UpdateUserEmailUseCase(makeUnitOfWork());

export const updateUserPassword = new UpdateUserPasswordUseCase(userRepositoryAdapter, cryptographyAdapter);

export const updateUsername = new UpdateUsernameUseCase(userRepositoryAdapter);

export const userLogin = new UserLoginUseCase(userRepositoryAdapter, cryptographyAdapter, authenticationAdapter);

export const userVerifyEmail = new UserVerifyEmailUseCase(userRepositoryAdapter);