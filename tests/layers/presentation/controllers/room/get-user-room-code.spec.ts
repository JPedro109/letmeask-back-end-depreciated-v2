import { GetUserRoomCodeStub } from "./stubs";
import { GetUserRoomCodeController, ok, RequestError } from "@/layers/presentation";

const makeSut = () => {
	const getUserRoomCodeStub = new GetUserRoomCodeStub();
	const sut = new GetUserRoomCodeController(getUserRoomCodeStub);

	return {
		getUserRoomCodeStub, 
		sut
	};
};

const makeBody = (userId: unknown) => {
	return {
		userId
	};
};

describe("Presentation - GetUserRoomCodeController", () => {
    
	test("Should not get user room, because user id is empty", async () => {
		const body = makeBody("");
		const { sut } = makeSut();

		const response = sut.http({ userId: body.userId as string });

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not get user room, because user id is with type error", async () => {
		const body = makeBody(100);
		const { sut } = makeSut();

		const response = sut.http({ userId: body.userId as string });

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should get user room", async () => {
		const body = makeBody("1");
		const { sut } = makeSut();

		const response = sut.http({ userId: body.userId as string });

		await expect(response).resolves.toEqual(ok("000000"));
	});
});
