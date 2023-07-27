import { authenticateUserMiddleware as authenticateUserMiddlewareFactory } from "@/main/factories/presentation/middlewares";
import { RestAdapter } from "../adapter";

export const authenticateUserMiddleware = RestAdapter.middleware(authenticateUserMiddlewareFactory);