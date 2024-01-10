import { 
	responseRepositoryAdapter,
	userRepositoryAdapter,
	questionRepositoryAdapter,
	cacheAdapter,
	roomRepositoryAdapter
} from "@/main/factories";
import { 
	CreateResponseUseCase 
} from "@/layers/domain";

export const createResponse = new CreateResponseUseCase(
	responseRepositoryAdapter, 
	userRepositoryAdapter,
	questionRepositoryAdapter,
	roomRepositoryAdapter,
	cacheAdapter
);