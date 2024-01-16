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
import { TreatmentDecoratorHttp } from "@/layers/presentation/decorators";
import { 
	logFacade, 
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

export const createUserController = new TreatmentDecoratorHttp(new CreateUserController(createUser), logFacade);

export const deleteUserController = new TreatmentDecoratorHttp(new DeleteUserController(deleteUser), logFacade);

export const getUsernameController = new TreatmentDecoratorHttp(new GetUsernameController(getUsername), logFacade);

export const recoverUserPasswordController 
	= new TreatmentDecoratorHttp(new RecoverUserPasswordController(recoverUserPassword), logFacade);

export const sendUserEmailUpdateLinkController 
	= new TreatmentDecoratorHttp(new SendUserEmailUpdateLinkController(sendUserEmailUpdateLink), logFacade);

export const sendUserPasswordRecoveryLinkController = 
	new TreatmentDecoratorHttp(new SendUserPasswordRecoveryLinkController(sendUserPasswordRecoveryLink), logFacade);

export const updateUserEmailController = 
	new TreatmentDecoratorHttp(new UpdateUserEmailController(updateUserEmail), logFacade);

export const updateUserPasswordController = new TreatmentDecoratorHttp(new UpdateUserPasswordController(updateUserPassword), logFacade);

export const updateUsernameController = new TreatmentDecoratorHttp(new UpdateUsernameController(updateUsername), logFacade);

export const userLoginController = new TreatmentDecoratorHttp(new UserLoginController(userLogin), logFacade);

export const userVerifyEmailController 
	= new TreatmentDecoratorHttp(new UserVerifyEmailController(userVerifyEmail), logFacade);