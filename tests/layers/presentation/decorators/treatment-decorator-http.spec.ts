import { ControllerStub, LogFacadeStub } from "./stubs";
import { TreatmentDecoratorHttp, serverError } from "@/layers/presentation";

describe("Presentation - TreatmentDecoratorHttp", () => {
	
	test("Should return server error", async () => {
		const controllerStub = new ControllerStub();
		const logFacadeStub = new LogFacadeStub();
		const sut = new TreatmentDecoratorHttp(controllerStub, logFacadeStub);

		const result = await sut.http({});

		expect(result).toEqual(serverError());
	});

	test("Should return server error with logged user", async () => {
		const controllerStub = new ControllerStub();
		const logFacadeStub = new LogFacadeStub();
		const sut = new TreatmentDecoratorHttp(controllerStub, logFacadeStub);

		const result = await sut.http({ userId: "1" });

		expect(result).toEqual(serverError());
	});
});