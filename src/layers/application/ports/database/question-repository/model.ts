import { ResponseModel } from "@/layers/application";

export class QuestionModel {
	constructor(
                public readonly id: string,
                public readonly userId: string,
                public readonly roomCode: string,
                public readonly question: string,
                public readonly response?: ResponseModel
	) { }
}