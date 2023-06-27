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
import { ExpressAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/users", ExpressAdapter.route(createUserController));
	router.patch("/users/verify-email", ExpressAdapter.route(userVerifyEmailController));
	router.post("/users/login", ExpressAdapter.route(userLoginController));
	router.delete("/users", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(deleteUserController));
	router.post("/users/send-email-update-link", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(sendUserEmailUpdateLinkController));
	router.post("/users/send-password-recovery-link", ExpressAdapter.route(sendUserPasswordRecoveryLinkController));
	router.patch("/users/email", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(updateUserEmailController));
	router.patch("/users/username", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(updateUsernameController));
	router.get("/users/username", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(getUsernameController));
	router.patch("/users/password-recover", ExpressAdapter.route(recoverUserPasswordController));
	router.patch("/users/password", ExpressAdapter.middleware(authenticateUserMiddleware), ExpressAdapter.route(updateUserPasswordController));
};