import { QueueAdapter, QueueHelper, SecretsAdapter } from "@/layers/external";

describe("External - QueueAdapter", () => {
	const secretsAdapter = new SecretsAdapter();
	const queueHelper = new QueueHelper(secretsAdapter);

	beforeAll(async () => await queueHelper.connect());
	afterAll(async () => await queueHelper.disconnect());

	test("Should send message | sendMessage", async () => {
		const sut = new QueueAdapter(queueHelper);
		jest.spyOn(sut, "sendMessage");
        
		await sut.sendMessage("queue", { name: "João" });

		expect(sut.sendMessage).toHaveBeenCalled();
		expect(sut.sendMessage).toHaveBeenCalledWith("queue", { name: "João" });
	});
});