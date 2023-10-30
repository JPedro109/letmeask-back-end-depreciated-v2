import { SecretsEnum, SecretsProtocol } from "@/layers/use-cases";

import "dotenv/config";

export class SecretsAdapter implements SecretsProtocol {
    
	getSecret(name: SecretsEnum): string | null {
		const value = process.env[name];

		if(!value) return null;

		return value;
	}

	getRequiredSecret(name: SecretsEnum): string {
		const value = process.env[name];

		if(!value) throw new Error(name);

		return value;
	}
}