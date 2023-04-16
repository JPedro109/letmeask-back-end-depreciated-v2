import { ControllerStub, LogRepositoryStub } from "./stubs";
import { TreatmentDecorator, server } from "@/layers/presentation";

describe("Presentation - TreatmentDecorator", () => {
	
	test("Should return server error", async () => {
		const controllerStub = new ControllerStub();
		const logRepositoryStub = new LogRepositoryStub();
		const sut = new TreatmentDecorator(controllerStub, logRepositoryStub);

		const result = await sut.handle({});

		expect(result).toEqual(server());
	});
});