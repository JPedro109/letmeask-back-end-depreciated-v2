export class ResponseModel {
	constructor(
        public readonly id: string,
        public readonly questionId: string,
        public readonly response: string
	) { }
}