import { testRoomModel } from "./datas";
import { GetRoomStub } from "./stubs";
import { NotFoundError } from "@/layers/use-cases";
import { GetRoomController, InvalidTypeError, MissingParamError, badRequest, notFound, ok } from "@/layers/presentation";

const makeSut = () => {
	const getRoomStub = new GetRoomStub();
	const sut = new GetRoomController(getRoomStub);

	return {
		getRoomStub, 
		sut
	};
};

const makeBody = (roomCode: unknown) => {
	return {
		roomCode
	};
};

describe("Presentation - GetRoomController", () => {
    
	test("Should not get room, because room code is empty", async () => {
		const body = makeBody("");
		const { sut } = makeSut();

		const result = await sut.handle({ data: { roomCode: body.roomCode } });

		expect(result).toEqual(badRequest(new MissingParamError("roomCode")));
	});

	test("Should not get room, because room code is with type error", async () => {
		const body = makeBody(100);
		const { sut } = makeSut();

		const result = await sut.handle({ data: { roomCode: body.roomCode } });

		expect(result).toEqual(badRequest(new InvalidTypeError("roomCode")));
	});

	test("Should not get room, because use case returned error", async () => {
		const body = makeBody("000001");
		const { sut, getRoomStub } = makeSut();
		jest.spyOn(getRoomStub, "execute").mockReturnValueOnce(Promise.resolve(new NotFoundError("error")));

		const result = await sut.handle({ data: { roomCode: body.roomCode } });

		expect(result).toEqual(notFound(new NotFoundError("error")));
	});

	test("Should not get room, because use case returned error", async () => {
		const body = makeBody("000000");
		const { sut, getRoomStub } = makeSut();
		jest.spyOn(getRoomStub, "execute").mockReturnValueOnce(Promise.resolve(new Error("error")));

		const result = await sut.handle({ data: { roomCode: body.roomCode } });

		expect(result).toEqual(badRequest(new Error("error")));
	});

	test("Should get room", async () => {
		const body = makeBody("000000");
		const { sut } = makeSut();

		const result = await sut.handle({ data: { roomCode: body.roomCode } });

		expect(result).toEqual(ok(testRoomModel));
	});
});