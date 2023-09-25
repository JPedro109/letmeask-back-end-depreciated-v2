import { GetRoomCodeStub } from "./stubs";
import { NotFoundError } from "@/layers/use-cases";
import { GetRoomCodeController, InvalidTypeError, MissingParamError, badRequest, notFound, ok } from "@/layers/presentation";

const makeSut = () => {
	const getRoomCodeStub = new GetRoomCodeStub();
	const sut = new GetRoomCodeController(getRoomCodeStub);

	return {
		getRoomCodeStub, 
		sut
	};
};

const makeBody = (roomCode: unknown) => {
	return {
		roomCode
	};
};

describe("Presentation - GetRoomCodeController", () => {
    
	test("Should not get true, because room code is empty", async () => {
		const body = makeBody("");
		const { sut } = makeSut();

		const result = await sut.http({ data: { roomCode: body.roomCode } });

		expect(result).toEqual(badRequest(new MissingParamError("roomCode")));
	});

	test("Should not get true, because room code is with type error", async () => {
		const body = makeBody(100);
		const { sut } = makeSut();

		const result = await sut.http({ data: { roomCode: body.roomCode } });

		expect(result).toEqual(badRequest(new InvalidTypeError("roomCode")));
	});

	test("Should not get true, because room use case returned not found error", async () => {
		const body = makeBody("00001");
		const { sut, getRoomCodeStub } = makeSut();
		jest.spyOn(getRoomCodeStub, "execute").mockResolvedValueOnce(Promise.resolve(new NotFoundError("error")));

		const result = await sut.http({ data: { roomCode: body.roomCode } });

		expect(result).toEqual(notFound(new NotFoundError("error")));
	});

	test("Should not get true, because room use case returned error", async () => {
		const body = makeBody("000");
		const { sut, getRoomCodeStub } = makeSut();
		jest.spyOn(getRoomCodeStub, "execute").mockResolvedValueOnce(Promise.resolve(new Error("error")));

		const result = await sut.http({ data: { roomCode: body.roomCode } });

		expect(result).toEqual(badRequest(new Error("error")));
	});

	test("Should get true", async () => {
		const body = makeBody("000000");
		const { sut } = makeSut();

		const result = await sut.http({ data: { roomCode: body.roomCode } });

		expect(result).toEqual(ok(true));
	});
});