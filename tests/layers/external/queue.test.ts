import { QueueAdapter, QueueHelper } from "@/layers/external";

describe("External - QueueAdapter", () => {
    
	beforeAll(async () => await QueueHelper.connect());
	afterAll(async () => await QueueHelper.disconnect());

	test("Should send message | sendMessage", async () => {
		const sut = new QueueAdapter();
		jest.spyOn(sut, "sendMessage");
        
		await sut.sendMessage("queue", { name: "João" });

		expect(sut.sendMessage).toHaveBeenCalled();
		expect(sut.sendMessage).toHaveBeenCalledWith("queue", { name: "João" });
	});
});