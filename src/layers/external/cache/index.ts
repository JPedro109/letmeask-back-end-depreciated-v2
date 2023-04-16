import NodeCache from "node-cache";
import { CacheProtocol } from "@/layers/use-cases";

export class CacheAdapter implements CacheProtocol {

	private cache: NodeCache;

	constructor() {
		this.cache = new NodeCache();
	}

	set<Type>(key: string, value: Type, expiryTimeInSeconds?: number): void {
		this.cache.set<Type>(key, value, expiryTimeInSeconds);
	}

	get<Type>(key: string): Type {
		return this.cache.get<Type>(key);
	}

	del(key: string): void {
		this.cache.del(key);
	}
}