import { ControllerStub, LogFacadeStub } from "./stubs";
import { DomainError } from "@/layers/domain";
import { NotFoundError, UnauthorizedError } from "@/layers/application";
import { TreatmentDecoratorHttp, HttpHelper } from "@/layers/presentation";

const makeSut = () => {
	const controllerStub = new ControllerStub();
	const logFacadeStub = new LogFacadeStub();
	const sut = new TreatmentDecoratorHttp(controllerStub, logFacadeStub);

	return {
		controllerStub,
		logFacadeStub,
		sut
	};
};

describe("Presentation - TreatmentDecoratorHttp", () => {
	
	test("Should return ok", async () => {
		const { sut } = makeSut();

		const result = await sut.http({ userId: "1" });

		expect(result).toEqual(HttpHelper.ok("test"));
	});

	test("Should return unauthorized", async () => {
		const { sut, controllerStub } = makeSut();
		jest.spyOn(controllerStub, "http").mockRejectedValueOnce(new UnauthorizedError("error"));

		const result = await sut.http({});

		expect(result).toEqual(HttpHelper.unauthorized(new UnauthorizedError("error")));
	});

	test("Should return not found", async () => {
		const { sut, controllerStub } = makeSut();
		jest.spyOn(controllerStub, "http").mockRejectedValueOnce(new NotFoundError("error"));

		const result = await sut.http({});

		expect(result).toEqual(HttpHelper.notFound(new NotFoundError("error")));
	});

	test("Should return badRequest", async () => {
		const { sut, controllerStub } = makeSut();
		jest.spyOn(controllerStub, "http").mockRejectedValueOnce(new DomainError("error"));

		const result = await sut.http({});

		expect(result).toEqual(HttpHelper.badRequest(new DomainError("error")));
	});

	test("Should return server error with logged user", async () => {
		const { sut, controllerStub } = makeSut();
		jest.spyOn(controllerStub, "http").mockRejectedValueOnce(new Error());

		const result = await sut.http({ userId: "1" });

		expect(result).toEqual(HttpHelper.serverError());
	});
});