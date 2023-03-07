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
import { adaptRoute, adaptMiddleware } from "@/main/express/adapters";
import { Router } from "express";

export default (router: Router): void => {
	router.post("/users", adaptRoute(createUserController));
	router.patch("/users/verify-email", adaptRoute(userVerifyEmailController));
	router.post("/users/login", adaptRoute(userLoginController));
	router.delete("/users", adaptMiddleware(authenticateUserMiddleware), adaptRoute(deleteUserController));
	router.post("/users/send-email-update-link", adaptMiddleware(authenticateUserMiddleware), adaptRoute(sendUserEmailUpdateLinkController));
	router.post("/users/send-password-recovery-link", adaptRoute(sendUserPasswordRecoveryLinkController));
	router.patch("/users/email", adaptMiddleware(authenticateUserMiddleware), adaptRoute(updateUserEmailController));
	router.patch("/users/username", adaptMiddleware(authenticateUserMiddleware), adaptRoute(updateUsernameController));
	router.get("/users/username", adaptMiddleware(authenticateUserMiddleware), adaptRoute(getUsernameController));
	router.patch("/users/password-recover", adaptRoute(recoverUserPasswordController));
	router.patch("/users/password", adaptMiddleware(authenticateUserMiddleware), adaptRoute(updateUserPasswordController));
};