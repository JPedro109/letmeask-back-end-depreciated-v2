import { 
	CreateResponseController, TreatmentDecorator,
} from "@/layers/presentation";
import { 
	createResponse, logFacade,
} from "@/main/factories";

export const createResponseController = new TreatmentDecorator(new CreateResponseController(createResponse), logFacade);