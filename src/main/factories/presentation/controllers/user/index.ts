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
	logAdapter, 
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

export const createUserController = new TreatmentDecorator(new CreateUserController(createUser), logAdapter);

export const deleteUserController = new TreatmentDecorator(new DeleteUserController(deleteUser), logAdapter);

export const getUsernameController = new TreatmentDecorator(new GetUsernameController(getUsername), logAdapter);

export const recoverUserPasswordController 
	= new TreatmentDecorator(new RecoverUserPasswordController(recoverUserPassword), logAdapter);

export const sendUserEmailUpdateLinkController 
	= new TreatmentDecorator(new SendUserEmailUpdateLinkController(sendUserEmailUpdateLink), logAdapter);

export const sendUserPasswordRecoveryLinkController = 
	new TreatmentDecorator(new SendUserPasswordRecoveryLinkController(sendUserPasswordRecoveryLink), logAdapter);

export const updateUserEmailController = 
	new TreatmentDecorator(new UpdateUserEmailController(updateUserEmail), logAdapter);

export const updateUserPasswordController = new TreatmentDecorator(new UpdateUserPasswordController(updateUserPassword), logAdapter);

export const updateUsernameController = new TreatmentDecorator(new UpdateUsernameController(updateUsername), logAdapter);

export const userLoginController = new TreatmentDecorator(new UserLoginController(userLogin), logAdapter);

export const userVerifyEmailController 
	= new TreatmentDecorator(new UserVerifyEmailController(userVerifyEmail), logAdapter);