export interface CacheProtocol {
	set<Type>(key: string, value: Type, expiryTimeInSeconds?: number): void;
	get<Type>(key: string): Type;
	del(key: string): void;
}