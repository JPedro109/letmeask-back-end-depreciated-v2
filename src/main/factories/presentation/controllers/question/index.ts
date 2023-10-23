import { 
	CreateQuestionController,
	GetUserQuestionsController,
	DeleteQuestionController,
	TreatmentDecorator
} from "@/layers/presentation";
import { 
	createQuestion,
	getUserQuestions,
	deleteQuestion,
	logFacade,
} from "@/main/factories";

export const createQuestionController = new TreatmentDecorator(new CreateQuestionController(createQuestion), logFacade);

export const getUserQuestionsController 
	= new TreatmentDecorator(new GetUserQuestionsController(getUserQuestions), logFacade);

export const deleteQuestionController = new TreatmentDecorator(new DeleteQuestionController(deleteQuestion), logFacade);