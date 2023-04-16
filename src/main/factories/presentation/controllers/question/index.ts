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
	logRepositoryAdapter,
} from "@/main/factories";

export const createQuestionController = new TreatmentDecorator(new CreateQuestionController(createQuestion), logRepositoryAdapter);

export const getUserQuestionsController 
	= new TreatmentDecorator(new GetUserQuestionsController(getUserQuestions), logRepositoryAdapter);

export const deleteQuestionController = new TreatmentDecorator(new DeleteQuestionController(deleteQuestion), logRepositoryAdapter);