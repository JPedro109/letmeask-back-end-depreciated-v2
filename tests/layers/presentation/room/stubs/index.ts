/* eslint-disable @typescript-eslint/no-unused-vars */

import { testRoomModel } from "../datas";
import { 
	CreateRoomDTO, 
	CreateRoomResponseDTO, 
	CreateRoomUseCaseProtocol, 
	DeleteRoomDTO, 
	DeleteRoomResponseDTO, 
	DeleteRoomUseCaseProtocol, 
	GetRoomCodeDTO, 
	GetRoomCodeResponseDTO, 
	GetRoomCodeUseCaseProtocol, 
	GetRoomDTO, 
	GetRoomResponseDTO, 
	GetRoomUseCaseProtocol, 
	GetUserRoomCodeDTO, 
	GetUserRoomCodeResponseDTO, 
	GetUserRoomCodeUseCaseProtocol 
} from "@/layers/use-cases";

export class CreateRoomStub implements CreateRoomUseCaseProtocol {
	async execute({ userId, roomName }: CreateRoomDTO): Promise<CreateRoomResponseDTO> {
		return testRoomModel;
	}
}

export class GetRoomStub implements GetRoomUseCaseProtocol {
	async execute({ roomCode }: GetRoomDTO): Promise<GetRoomResponseDTO> {
		return testRoomModel;
	}
}

export class GetRoomCodeStub implements GetRoomCodeUseCaseProtocol {
	async execute({ roomCode }: GetRoomCodeDTO): Promise<GetRoomCodeResponseDTO> {
		return true;
	}
}

export class GetUserRoomCodeStub implements GetUserRoomCodeUseCaseProtocol {
	async execute({ userId }: GetUserRoomCodeDTO): Promise<GetUserRoomCodeResponseDTO> {
		return "000000";
	}
}

export class DeleteRoomStub implements DeleteRoomUseCaseProtocol {
	async execute({ userId, roomCode }: DeleteRoomDTO): Promise<DeleteRoomResponseDTO> {
		return testRoomModel;
	}
}