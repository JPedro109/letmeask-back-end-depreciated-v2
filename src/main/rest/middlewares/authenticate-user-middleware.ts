import { authenticateUserMiddleware as authenticateUserMiddlewareFactory } from "@/main/factories/presentation/middlewares";
import { ExpressAdapter } from "../adapter";

export const authenticateUserMiddleware = ExpressAdapter.middleware(authenticateUserMiddlewareFactory);