import { 
	responseRepositoryAdapter,
	questionRepositoryAdapter,
	cacheAdapter,
	roomRepositoryAdapter
} from "@/main/factories";
import { CreateResponseUseCase } from "@/layers/application";

export const createResponse = new CreateResponseUseCase(
	responseRepositoryAdapter, 
	questionRepositoryAdapter,
	roomRepositoryAdapter,
	cacheAdapter
);