import { AuthUserMiddleware } from "@/layers/presentation";
import { authenticationAdapter } from "@/main/factories/external";

export const authUserMiddleware = new AuthUserMiddleware(authenticationAdapter);