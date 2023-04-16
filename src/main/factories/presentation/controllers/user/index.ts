import { 
	CreateUserController, 
	DeleteUserController, 
	GetUsernameController,
	RecoverUserPasswordController, 
	SendUserEmailUpdateLinkController,
	SendUserPasswordRecoveryLinkController,
	UpdateUserEmailController,
	UpdateUserPasswordController,
	UpdateUsernameController,
	UserVerifyEmailController,
	UserLoginController,
} from "@/layers/presentation";
import { TreatmentDecorator } from "@/layers/presentation/decorators";
import { 
	logRepositoryAdapter, 
	createUser, 
	deleteUser, 
	getUsername, 
	recoverUserPassword, 
	sendUserEmailUpdateLink, 
	sendUserPasswordRecoveryLink, 
	updateUserEmail, 
	updateUserPassword, 
	updateUsername, 
	userLogin, 
	userVerifyEmail 
} from "@/main/factories";

export const createUserController = new TreatmentDecorator(new CreateUserController(createUser), logRepositoryAdapter);

export const deleteUserController = new TreatmentDecorator(new DeleteUserController(deleteUser), logRepositoryAdapter);

export const getUsernameController = new TreatmentDecorator(new GetUsernameController(getUsername), logRepositoryAdapter);

export const recoverUserPasswordController 
	= new TreatmentDecorator(new RecoverUserPasswordController(recoverUserPassword), logRepositoryAdapter);

export const sendUserEmailUpdateLinkController 
	= new TreatmentDecorator(new SendUserEmailUpdateLinkController(sendUserEmailUpdateLink), logRepositoryAdapter);

export const sendUserPasswordRecoveryLinkController = 
	new TreatmentDecorator(new SendUserPasswordRecoveryLinkController(sendUserPasswordRecoveryLink), logRepositoryAdapter);

export const updateUserEmailController = 
	new TreatmentDecorator(new UpdateUserEmailController(updateUserEmail), logRepositoryAdapter);

export const updateUserPasswordController = new TreatmentDecorator(new UpdateUserPasswordController(updateUserPassword), logRepositoryAdapter);

export const updateUsernameController = new TreatmentDecorator(new UpdateUsernameController(updateUsername), logRepositoryAdapter);

export const userLoginController = new TreatmentDecorator(new UserLoginController(userLogin), logRepositoryAdapter);

export const userVerifyEmailController 
	= new TreatmentDecorator(new UserVerifyEmailController(userVerifyEmail), logRepositoryAdapter);