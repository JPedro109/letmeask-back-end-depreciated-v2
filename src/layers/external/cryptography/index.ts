import { CryptographyProtocol } from "@/layers/use-cases";

import bcryptjs from "bcryptjs";

export class CryptographyAdapter implements CryptographyProtocol {
    
	private readonly bcryptjs = bcryptjs;
	private readonly salt: number = 12;

	async hash(value: string): Promise<string> {
		return await this.bcryptjs.hash(value, this.salt);
	}

	async compareHash(hash: string, valueToBeCompared: string): Promise<boolean> {
		return await this.bcryptjs.compare(valueToBeCompared, hash);
	}
}