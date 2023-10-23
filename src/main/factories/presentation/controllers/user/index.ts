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

export const createUserController = new TreatmentDecorator(new CreateUserController(createUser), logFacade);

export const deleteUserController = new TreatmentDecorator(new DeleteUserController(deleteUser), logFacade);

export const getUsernameController = new TreatmentDecorator(new GetUsernameController(getUsername), logFacade);

export const recoverUserPasswordController 
	= new TreatmentDecorator(new RecoverUserPasswordController(recoverUserPassword), logFacade);

export const sendUserEmailUpdateLinkController 
	= new TreatmentDecorator(new SendUserEmailUpdateLinkController(sendUserEmailUpdateLink), logFacade);

export const sendUserPasswordRecoveryLinkController = 
	new TreatmentDecorator(new SendUserPasswordRecoveryLinkController(sendUserPasswordRecoveryLink), logFacade);

export const updateUserEmailController = 
	new TreatmentDecorator(new UpdateUserEmailController(updateUserEmail), logFacade);

export const updateUserPasswordController = new TreatmentDecorator(new UpdateUserPasswordController(updateUserPassword), logFacade);

export const updateUsernameController = new TreatmentDecorator(new UpdateUsernameController(updateUsername), logFacade);

export const userLoginController = new TreatmentDecorator(new UserLoginController(userLogin), logFacade);

export const userVerifyEmailController 
	= new TreatmentDecorator(new UserVerifyEmailController(userVerifyEmail), logFacade);