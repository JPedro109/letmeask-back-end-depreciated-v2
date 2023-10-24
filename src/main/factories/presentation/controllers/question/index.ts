import { 
	CreateQuestionController,
	GetUserQuestionsController,
	DeleteQuestionController,
	TreatmentDecoratorHttp
} from "@/layers/presentation";
import { 
	createQuestion,
	getUserQuestions,
	deleteQuestion,
	logFacade,
} from "@/main/factories";

export const createQuestionController = new TreatmentDecoratorHttp(new CreateQuestionController(createQuestion), logFacade);

export const getUserQuestionsController 
	= new TreatmentDecoratorHttp(new GetUserQuestionsController(getUserQuestions), logFacade);

export const deleteQuestionController = new TreatmentDecoratorHttp(new DeleteQuestionController(deleteQuestion), logFacade);