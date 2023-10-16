import { ControllerStub, LogAdapterStub } from "./stubs";
import { TreatmentDecorator, server } from "@/layers/presentation";

describe("Presentation - TreatmentDecorator", () => {
	
	test("Should return server error", async () => {
		const controllerStub = new ControllerStub();
		const logAdapterStub = new LogAdapterStub();
		const sut = new TreatmentDecorator(controllerStub, logAdapterStub);

		const result = await sut.http({});

		expect(result).toEqual(server());
	});
});