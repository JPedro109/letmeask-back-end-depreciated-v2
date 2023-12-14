import { ResponseModel } from "@/layers/use-cases";

export class QuestionModel {
	constructor(
                public readonly id: string,
                public readonly userId: string,
                public readonly roomCode: string,
                public readonly question: string,
                public readonly response?: ResponseModel
	) { }
}