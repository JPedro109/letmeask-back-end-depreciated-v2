import { AuthenticateUserMiddleware } from "@/layers/presentation";
import { jsonWebTokenAdapter } from "@/main/factories/external";

export const authenticateUserMiddleware = new AuthenticateUserMiddleware(jsonWebTokenAdapter);