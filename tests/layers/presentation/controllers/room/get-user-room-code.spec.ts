import { GetUserRoomCodeStub } from "./stubs";
import { GetUserRoomCodeController, InvalidTypeError, MissingParamError, badRequest, ok } from "@/layers/presentation";

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

		const result = await sut.handle({ userId: body.userId as string });

		expect(result).toEqual(badRequest(new MissingParamError("userId")));
	});

	test("Should not get user room, because user id is with type error", async () => {
		const body = makeBody(100);
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string });

		expect(result).toEqual(badRequest(new InvalidTypeError("userId")));
	});

	test("Should get user room", async () => {
		const body = makeBody("1");
		const { sut } = makeSut();

		const result = await sut.handle({ userId: body.userId as string });

		expect(result).toEqual(ok("000000"));
	});
});