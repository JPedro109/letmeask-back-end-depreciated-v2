import { MailAdapter, QueueAdapter, QueueHelper, SecretsAdapter } from "@/layers/external";

describe("External - MailAdapter", () => {
	const secretsAdapter = new SecretsAdapter();
	const queueHelper = new QueueHelper(secretsAdapter);

	beforeAll(async () => await queueHelper.connect());
	
	afterAll(async () => await queueHelper.disconnect());
		
	test("Should send email | sendEmail", async () => {
		const email = "email@test.com";
		const subject = "Test";
		const html = "create-user-body";
		const queueAdapter = new QueueAdapter(queueHelper);
		
		const sut = new MailAdapter(queueAdapter, secretsAdapter);
		jest.spyOn(sut, "sendMail");
        
		await sut.sendMail(email, subject, html);

		expect(sut.sendMail).toHaveBeenCalled();
		expect(sut.sendMail).toHaveBeenCalledWith(email, subject, html);
	});
});