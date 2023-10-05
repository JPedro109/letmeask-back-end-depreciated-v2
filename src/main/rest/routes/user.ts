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
import { authUserMiddleware } from "@/main/factories/presentation/middlewares";
import { RestAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/users", RestAdapter.route(createUserController));
	router.patch("/users/verify-email", RestAdapter.route(userVerifyEmailController));
	router.post("/users/login", RestAdapter.route(userLoginController));
	router.delete("/users", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(deleteUserController));
	router.post("/users/send-email-update-link", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(sendUserEmailUpdateLinkController));
	router.post("/users/send-password-recovery-link", RestAdapter.route(sendUserPasswordRecoveryLinkController));
	router.patch("/users/email", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(updateUserEmailController));
	router.patch("/users/username", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(updateUsernameController));
	router.get("/users/username", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(getUsernameController));
	router.patch("/users/password-recover", RestAdapter.route(recoverUserPasswordController));
	router.patch("/users/password", RestAdapter.middleware(authUserMiddleware), RestAdapter.route(updateUserPasswordController));
};