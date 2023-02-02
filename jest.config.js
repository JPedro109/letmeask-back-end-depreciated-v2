module.exports = {
	roots: ["<rootDir>/tests"],
	testEnvironment: "node",
	collectCoverageFrom: [
		"<rootDir>/src/**",
		"!<rootDir>/src/server.ts",
		"!<rootDir>/src/main/**/@types/**",
		"!<rootDir>/src/main/**/adapters/**",
		"!<rootDir>/src/main/**/middlewares/**",
	],
	moduleNameMapper: {
		"@/(.*)": "<rootDir>/src/$1",
	},
	transform: {
		".+\\.ts$": "ts-jest"
	},
	modulePathIgnorePatterns: [
		".*__mocks__.*"
	],
};