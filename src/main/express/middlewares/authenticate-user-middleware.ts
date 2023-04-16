import { authenticateUserMiddleware as authenticateUserMiddlewareFactory } from "@/main/factories/presentation/middlewares";
import { adaptMiddleware } from "../adapters";

export const authenticateUserMiddleware = adaptMiddleware(authenticateUserMiddlewareFactory);