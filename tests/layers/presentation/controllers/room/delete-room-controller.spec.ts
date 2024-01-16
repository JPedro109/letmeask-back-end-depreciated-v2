import { testRoomModel } from "./datas";
import { DeleteRoomStub } from "./stubs";
import { DeleteRoomController, HttpHelper, InvalidRequestError } from "@/layers/presentation";

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

		const response = sut.http({ userId: body.userId as string, data: { roomCode: body.roomCode } });

		await expect(response).rejects.toThrow(InvalidRequestError);
	});

	test("Should not delete room, because roomCode is empty", async () => {
		const body = makeBody("1", "");
		const { sut } = makeSut();

		const response = sut.http({ userId: body.userId as string, data: { roomCode: body.roomCode } });

		await expect(response).rejects.toThrow(InvalidRequestError);
	});

	test("Should not delete room, because userId is with type error", async () => {
		const body = makeBody(100, "room");
		const { sut } = makeSut();

		const response = sut.http({ userId: body.userId as string, data: { roomCode: body.roomCode } });

		await expect(response).rejects.toThrow(InvalidRequestError);
	});

	test("Should not delete room, because roomCode is with type error", async () => {
		const body = makeBody("1", 100);
		const { sut } = makeSut();

		const response = sut.http({ userId: body.userId as string, data: { roomCode: body.roomCode } });

		await expect(response).rejects.toThrow(InvalidRequestError);
	});

	test("Should delete room", async () => {
		const body = makeBody("1", "000000");
		const { sut } = makeSut();

		const response = sut.http({ userId: body.userId as string, data: { roomCode: body.roomCode } });

		await expect(response).resolves.toEqual(HttpHelper.ok(testRoomModel));
	});
});
