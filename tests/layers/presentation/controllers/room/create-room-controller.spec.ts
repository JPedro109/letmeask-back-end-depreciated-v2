import { testRoomModel } from "./datas";
import { CreateRoomStub } from "./stubs";
import { UnauthorizedError } from "@/layers/use-cases";
import { CreateRoomController, MissingParamError, InvalidTypeError, badRequest, created, unauthorized } from "@/layers/presentation";

const makeSut = () => {
	const createRoomStub = new CreateRoomStub();
	const sut = new CreateRoomController(createRoomStub);

	return {
		createRoomStub, 
		sut
	};
};

const makeBody = (userId: unknown, roomName: unknown) => {
	return {
		userId,
		roomName
	};
};

describe("Presentation - CreateRoomController", () => {
    
	test("Should not create room, because userId is empty", async () => {
		const body = makeBody("", "room");
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string, body: { roomName: body.roomName } });

		expect(result).toEqual(badRequest(new MissingParamError("userId")));
	});

	test("Should not create room, because room name is empty", async () => {
		const body = makeBody("1", "");
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string, body: { roomName: body.roomName } });

		expect(result).toEqual(badRequest(new MissingParamError("roomName")));
	});

	test("Should not create room, because userId is with type error", async () => {
		const body = makeBody(100, "room");
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string, body: { roomName: body.roomName } });

		expect(result).toEqual(badRequest(new InvalidTypeError("userId")));
	});

	test("Should not create room, because roomName is with type error", async () => {
		const body = makeBody("1", 100);
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string, body: { roomName: body.roomName } });

		expect(result).toEqual(badRequest(new InvalidTypeError("roomName")));
	});

	test("Should not create room, because use case returned unauthorized error", async () => {
		const body = makeBody("1", "room");
		const { sut, createRoomStub } = makeSut();
		jest.spyOn(createRoomStub, "execute").mockResolvedValueOnce(Promise.resolve(new UnauthorizedError("error")));

		const result = await sut.handle({ userId: body.userId as string, body: { roomName: body.roomName } });

		expect(result).toEqual(unauthorized(new UnauthorizedError("error")));
	});

	test("Should not create room, because use case returned error", async () => {
		const body = makeBody("1", "room");
		const { sut, createRoomStub } = makeSut();
		jest.spyOn(createRoomStub, "execute").mockResolvedValueOnce(Promise.resolve(new Error("error")));

		const result = await sut.handle({ userId: body.userId as string, body: { roomName: body.roomName } });

		expect(result).toEqual(badRequest(new Error("error")));
	});

	test("Should create room", async () => {
		const body = makeBody("1", "room");
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string, body: { roomName: body.roomName } });

		expect(result).toEqual(created(testRoomModel));
	});
});