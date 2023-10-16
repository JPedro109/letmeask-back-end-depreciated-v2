import { 
	CreateResponseController, TreatmentDecorator,
} from "@/layers/presentation";
import { 
	createResponse, logAdapter,
} from "@/main/factories";

export const createResponseController = new TreatmentDecorator(new CreateResponseController(createResponse), logAdapter);