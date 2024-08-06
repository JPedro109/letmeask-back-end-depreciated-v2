export interface GenerationProtocol {
	code(): string;
	codeExpirationDate(timeInMinutes: number): number;
}