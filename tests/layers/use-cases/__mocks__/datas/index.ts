import { UserModel, RoomModel, QuestionModel, ResponseModel, UserVerificationCodeModel } from "@/layers/domain";

export const testRoomModel = new RoomModel("1", "1", "000000", "room", []);
export const testQuestionModel = new QuestionModel("1", "1", "000000", "question", null);
export const testResponseModel = new ResponseModel("1", "1", "response");
export const testUserVerificationCodeModel = new UserVerificationCodeModel("1", "1", "AAAAAAA", 999999999999999, true, false);
export const testUserModel = new UserModel(
	"1", 
	"email@teste.com", 
	"username", 
	"hash_password", 
	true, 
	testUserVerificationCodeModel
);