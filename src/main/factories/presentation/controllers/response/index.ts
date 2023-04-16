import { 
	CreateResponseController, TreatmentDecorator,
} from "@/layers/presentation";
import { 
	createResponse, logRepositoryAdapter,
} from "@/main/factories";

export const createResponseController = new TreatmentDecorator(new CreateResponseController(createResponse), logRepositoryAdapter);