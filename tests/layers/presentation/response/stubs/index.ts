/* eslint-disable @typescript-eslint/no-unused-vars */

import { testResponseModel } from "../datas";
import { CreateResponseUseCase, CreateResponseResponseDTO, CreateResponseDTO, CreateResponseUseCaseProtocol } from "@/layers/use-cases";

export class CreateResponseStub implements CreateResponseUseCaseProtocol {
	async execute({ userId, questionId, response }: CreateResponseDTO): Promise<CreateResponseResponseDTO> {
		return testResponseModel;
	}
}