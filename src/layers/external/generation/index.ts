import { GenerationProtocol } from "@/layers/use-cases";

import { randomBytes } from "crypto";

export class GenerationAdapter implements GenerationProtocol {

	code(): string {
		return randomBytes(3).toString("hex").toUpperCase();
	}

	codeExpirationDate(timeInMinutes: number): number {
		return new Date().setMinutes(new Date().getMinutes() + timeInMinutes);
	}

}