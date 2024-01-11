import { testRoomModel } from "./datas";
import { CreateRoomStub } from "./stubs";
import { CreateRoomController, HttpHelper, RequestError } from "@/layers/presentation";

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
		const data = makeBody("", "room");
		const { sut } = makeSut();

		const result = sut.http({ userId: data.userId as string, data: { roomName: data.roomName } });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not create room, because room name is empty", async () => {
		const data = makeBody("1", "");
		const { sut } = makeSut();

		const result = sut.http({ userId: data.userId as string, data: { roomName: data.roomName } });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not create room, because userId is with type error", async () => {
		const data = makeBody(100, "room");
		const { sut } = makeSut();

		const result = sut.http({ userId: data.userId as string, data: { roomName: data.roomName } });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not create room, because roomName is with type error", async () => {
		const data = makeBody("1", 100);
		const { sut } = makeSut();

		const result = sut.http({ userId: data.userId as string, data: { roomName: data.roomName } });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should create room", async () => {
		const data = makeBody("1", "room");
		const { sut } = makeSut();

		const result = sut.http({ userId: data.userId as string, data: { roomName: data.roomName } });

		await expect(result).resolves.toEqual(HttpHelper.created(testRoomModel));
	});
});
