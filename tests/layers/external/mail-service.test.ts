import { MailAdapter, QueueAdapter, QueueHelper } from "@/layers/external";

describe("External - MailAdapter", () => {
	const queueHelper = new QueueHelper();
	beforeAll(async () => await queueHelper.connect());
	
	afterAll(async () => await queueHelper.disconnect());
		
	test("Should send email | sendEmail", async () => {
		const email = "email@test.com";
		const subject = "Test";
		const html = "create-user-body";
		const queueAdapter = new QueueAdapter(queueHelper);
		const sut = new MailAdapter(queueAdapter);
		jest.spyOn(sut, "sendMail");
        
		await sut.sendMail(email, subject, html);

		expect(sut.sendMail).toHaveBeenCalled();
		expect(sut.sendMail).toHaveBeenCalledWith(email, subject, html);
	});
});