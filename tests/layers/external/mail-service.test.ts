import { MailServiceAdapter, QueueAdapter, QueueHelper } from "@/layers/external";

describe("External - MailServiceAdapter", () => {

	beforeAll(async () => await QueueHelper.connect());
	
	afterAll(async () => await QueueHelper.disconnect());
		
	test("Should send email | sendEmail", async () => {
		const email = "email@test.com";
		const subject = "Test";
		const html = "create-user-body";
		const queueAdapter = new QueueAdapter();
		const sut = new MailServiceAdapter(queueAdapter);
		jest.spyOn(sut, "sendMail");
        
		await sut.sendMail(email, subject, html);

		expect(sut.sendMail).toHaveBeenCalled();
		expect(sut.sendMail).toHaveBeenCalledWith(email, subject, html);
	});
});