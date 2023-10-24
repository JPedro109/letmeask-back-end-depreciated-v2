import { ControllerStub, LogFacadeStub } from "./stubs";
import { TreatmentDecoratorHttp, server } from "@/layers/presentation";

describe("Presentation - TreatmentDecoratorHttp", () => {
	
	test("Should return server error", async () => {
		const controllerStub = new ControllerStub();
		const logFacadeStub = new LogFacadeStub();
		const sut = new TreatmentDecoratorHttp(controllerStub, logFacadeStub);

		const result = await sut.http({});

		expect(result).toEqual(server());
	});
});