import { authUserMiddleware as authUserMiddlewareFactory } from "@/main/factories/presentation/middlewares";
import { RestAdapter } from "../adapter";

export const authUserMiddleware = RestAdapter.middleware(authUserMiddlewareFactory);