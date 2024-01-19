import { roomRepositoryAdapter, cacheAdapter } from "@/main/factories";
import { CreateRoomUseCase, GetRoomUseCase, GetUserRoomCodeUseCase, DeleteRoomUseCase, GetRoomCodeUseCase } from "@/layers/application";

export const createRoom = new CreateRoomUseCase(roomRepositoryAdapter);

export const getRoom = new GetRoomUseCase(roomRepositoryAdapter, cacheAdapter);

export const getUserRoomCode = new GetUserRoomCodeUseCase(roomRepositoryAdapter);

export const getRoomCode = new GetRoomCodeUseCase(roomRepositoryAdapter);

export const deleteRoom = new DeleteRoomUseCase(roomRepositoryAdapter, cacheAdapter);