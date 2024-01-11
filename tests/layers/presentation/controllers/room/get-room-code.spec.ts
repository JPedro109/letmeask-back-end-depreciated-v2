import { GetRoomCodeStub } from "./stubs";
import { GetRoomCodeController, HttpHelper, RequestError } from "@/layers/presentation";

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

		const result = sut.http({ data: { roomCode: body.roomCode } });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not get true, because room code is with type error", async () => {
		const body = makeBody(100);
		const { sut } = makeSut();

		const result = sut.http({ data: { roomCode: body.roomCode } });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should get true", async () => {
		const body = makeBody("000000");
		const { sut } = makeSut();

		const result = sut.http({ data: { roomCode: body.roomCode } });

		await expect(result).resolves.toEqual(HttpHelper.ok(true));
	});
});
