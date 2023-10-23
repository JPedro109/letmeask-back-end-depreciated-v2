import { ControllerStub, LogFacadeStub } from "./stubs";
import { TreatmentDecorator, server } from "@/layers/presentation";

describe("Presentation - TreatmentDecorator", () => {
	
	test("Should return server error", async () => {
		const controllerStub = new ControllerStub();
		const logFacadeStub = new LogFacadeStub();
		const sut = new TreatmentDecorator(controllerStub, logFacadeStub);

		const result = await sut.http({});

		expect(result).toEqual(server());
	});
});