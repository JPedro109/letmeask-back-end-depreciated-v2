import { 
	createUserController, 
	deleteUserController, 
	getUsernameController, 
	recoverUserPasswordController, 
	sendUserEmailUpdateLinkController, 
	sendUserPasswordRecoveryLinkController, 
	updateUserEmailController, 
	updateUserPasswordController, 
	updateUsernameController, 
	userLoginController, 
	userVerifyEmailController 
} from "@/main/factories/presentation";
import { authenticateUserMiddleware } from "@/main/factories/presentation/middlewares";
import { RestAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/users", RestAdapter.route(createUserController));
	router.patch("/users/verify-email", RestAdapter.route(userVerifyEmailController));
	router.post("/users/login", RestAdapter.route(userLoginController));
	router.delete("/users", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(deleteUserController));
	router.post("/users/send-email-update-link", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(sendUserEmailUpdateLinkController));
	router.post("/users/send-password-recovery-link", RestAdapter.route(sendUserPasswordRecoveryLinkController));
	router.patch("/users/email", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(updateUserEmailController));
	router.patch("/users/username", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(updateUsernameController));
	router.get("/users/username", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(getUsernameController));
	router.patch("/users/password-recover", RestAdapter.route(recoverUserPasswordController));
	router.patch("/users/password", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(updateUserPasswordController));
};