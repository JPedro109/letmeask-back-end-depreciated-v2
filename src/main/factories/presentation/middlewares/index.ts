import { AuthenticateUserMiddleware } from "@/layers/presentation";
import { authenticationAdapter } from "@/main/factories/external";

export const authenticateUserMiddleware = new AuthenticateUserMiddleware(authenticationAdapter);