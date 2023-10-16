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
	logAdapter,
} from "@/main/factories";

export const createQuestionController = new TreatmentDecorator(new CreateQuestionController(createQuestion), logAdapter);

export const getUserQuestionsController 
	= new TreatmentDecorator(new GetUserQuestionsController(getUserQuestions), logAdapter);

export const deleteQuestionController = new TreatmentDecorator(new DeleteQuestionController(deleteQuestion), logAdapter);