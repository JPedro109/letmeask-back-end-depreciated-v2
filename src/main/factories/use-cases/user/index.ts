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
} from "@/layers/use-cases";
import { 
	cryptographyAdapter, 
	generationAdapter, 
	jsonWebTokenAdapter, 
	mailServiceAdapter, 
	makeUnitOfWork, 
	userRepositoryAdapter, 
	userVerificationCodeRepositoryAdapter
} from "@/main/factories";

export const createUser = new CreateUserUseCase(
	makeUnitOfWork(), 
	mailServiceAdapter, 
	cryptographyAdapter, 
	generationAdapter
);

export const deleteUser = new DeleteUserUseCase(userRepositoryAdapter, cryptographyAdapter);

export const getUsername = new GetUsernameUseCase(userRepositoryAdapter);

export const recoverUserPassword = new RecoverUserPasswordUseCase(makeUnitOfWork(), cryptographyAdapter);

export const sendUserEmailUpdateLink = new SendUserEmailUpdateLinkUseCase(
	userRepositoryAdapter, 
	userVerificationCodeRepositoryAdapter,
	generationAdapter, 
	mailServiceAdapter
);

export const sendUserPasswordRecoveryLink = new SendUserPasswordRecoveryLinkUseCase(
	userRepositoryAdapter, 
	userVerificationCodeRepositoryAdapter,
	generationAdapter, 
	mailServiceAdapter
);

export const updateUserEmail = new UpdateUserEmailUseCase(makeUnitOfWork());

export const updateUserPassword = new UpdateUserPasswordUseCase(userRepositoryAdapter, cryptographyAdapter);

export const updateUsername = new UpdateUsernameUseCase(userRepositoryAdapter);

export const userLogin = new UserLoginUseCase(userRepositoryAdapter, cryptographyAdapter, jsonWebTokenAdapter);

export const userVerifyEmail = new UserVerifyEmailUseCase(userRepositoryAdapter);