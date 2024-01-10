import { 
	userRepositoryAdapter,
	roomRepositoryAdapter,
	cacheAdapter,
	makeUnitOfWork
} from "@/main/factories";

import {
	CreateRoomUseCase,
	GetRoomUseCase,
	GetUserRoomCodeUseCase,
	DeleteRoomUseCase,
	GetRoomCodeUseCase
} from "@/layers/domain";

export const createRoom = new CreateRoomUseCase(makeUnitOfWork());

export const getRoom = new GetRoomUseCase(roomRepositoryAdapter, cacheAdapter);

export const getUserRoomCode = new GetUserRoomCodeUseCase(roomRepositoryAdapter);

export const getRoomCode = new GetRoomCodeUseCase(roomRepositoryAdapter);

export const deleteRoom = new DeleteRoomUseCase(roomRepositoryAdapter, userRepositoryAdapter, cacheAdapter);