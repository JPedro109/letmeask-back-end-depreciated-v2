import { testRoomModel } from "./datas";
import { GetRoomStub } from "./stubs";
import { GetRoomController, ok, RequestError } from "@/layers/presentation";

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

		const result = sut.http({ data: { roomCode: body.roomCode } });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not get room, because room code is with type error", async () => {
		const body = makeBody(100);
		const { sut } = makeSut();

		const result = sut.http({ data: { roomCode: body.roomCode } });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should get room", async () => {
		const body = makeBody("000000");
		const { sut } = makeSut();

		const result = sut.http({ data: { roomCode: body.roomCode } });

		await expect(result).resolves.toEqual(ok(testRoomModel));
	});
});
