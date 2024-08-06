import { QuestionModel } from "@/layers/application";

export class RoomModel {
	constructor(
                public readonly id: string,
                public readonly userId: string,
                public readonly code: string,
                public readonly name: string,
                public readonly questions: QuestionModel[]
	) { }
}