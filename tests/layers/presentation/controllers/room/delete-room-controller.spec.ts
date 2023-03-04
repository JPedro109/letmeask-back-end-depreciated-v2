import { testRoomModel } from "./datas";
import { DeleteRoomStub } from "./stubs";
import { DeleteRoomController, MissingParamError, InvalidTypeError, badRequest, ok, unauthorized, notFound } from "@/layers/presentation";
import { NotFoundError, UnauthorizedError } from "@/layers/use-cases";

const makeSut = () => {
	const deleteRoomStub = new DeleteRoomStub();
	const sut = new DeleteRoomController(deleteRoomStub);

	return {
		deleteRoomStub, 
		sut
	};
};

const makeBody = (userId: unknown, roomCode: unknown) => {
	return {
		userId,
		roomCode
	};
};

describe("Presentation - DeleteRoomController", () => {
    
	test("Should not delete room, because userId is empty", async () => {
		const body = makeBody("", "000000");
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string, params: { roomCode: body.roomCode } });

		expect(result).toEqual(badRequest(new MissingParamError("userId")));
	});

	test("Should not delete room, because roomCode is empty", async () => {
		const body = makeBody("1", "");
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string, params: { roomCode: body.roomCode } });

		expect(result).toEqual(badRequest(new MissingParamError("roomCode")));
	});

	test("Should not delete room, because userId is with type error", async () => {
		const body = makeBody(100, "room");
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string, params: { roomCode: body.roomCode } });

		expect(result).toEqual(badRequest(new InvalidTypeError("userId")));
	});

	test("Should not delete room, because roomCode is with type error", async () => {
		const body = makeBody("1", 100);
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string, params: { roomCode: body.roomCode } });

		expect(result).toEqual(badRequest(new InvalidTypeError("roomCode")));
	});


	test("Should not delete room, because use case returned not found error", async () => {
		const body = makeBody("1", "000000");
		const { sut, deleteRoomStub } = makeSut();
		jest.spyOn(deleteRoomStub, "execute").mockResolvedValueOnce(Promise.resolve(new NotFoundError("error")));

		const result = await sut.handle({ userId: body.userId as string, params: { roomCode: body.roomCode } });

		expect(result).toEqual(notFound(new NotFoundError("error")));
	});

	test("Should not delete room, because use case returned unauthorized error", async () => {
		const body = makeBody("1", "000000");
		const { sut, deleteRoomStub } = makeSut();
		jest.spyOn(deleteRoomStub, "execute").mockResolvedValueOnce(Promise.resolve(new UnauthorizedError("error")));

		const result = await sut.handle({ userId: body.userId as string, params: { roomCode: body.roomCode } });

		expect(result).toEqual(unauthorized(new UnauthorizedError("error")));
	});

	test("Should not delete room, because use case returned error", async () => {
		const body = makeBody("1", "000000");
		const { sut, deleteRoomStub } = makeSut();
		jest.spyOn(deleteRoomStub, "execute").mockResolvedValueOnce(Promise.resolve(new Error("error")));

		const result = await sut.handle({ userId: body.userId as string, params: { roomCode: body.roomCode } });

		expect(result).toEqual(badRequest(new Error("error")));
	});

	test("Should delete room", async () => {
		const body = makeBody("1", "000000");
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string, params: { roomCode: body.roomCode } });

		expect(result).toEqual(ok(testRoomModel));
	});
});