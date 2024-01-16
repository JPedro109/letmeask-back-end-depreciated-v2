import { 
	CreateResponseController, TreatmentDecoratorHttp,
} from "@/layers/presentation";
import { 
	createResponse, logFacade,
} from "@/main/factories";

export const createResponseController = new TreatmentDecoratorHttp(new CreateResponseController(createResponse), logFacade);