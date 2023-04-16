import { 
	CreateRoomController,
	GetRoomController,
	GetRoomCodeController,
	GetUserRoomCodeController,
	DeleteRoomController,
	TreatmentDecorator
} from "@/layers/presentation";
import { 
	createRoom,
	getRoom,
	getUserRoomCode,
	deleteRoom,
	getRoomCode,
	logRepositoryAdapter
} from "@/main/factories";

export const createRoomController = new TreatmentDecorator(new CreateRoomController(createRoom), logRepositoryAdapter);

export const getRoomController = new TreatmentDecorator(new GetRoomController(getRoom), logRepositoryAdapter);

export const getUserRoomCodeController 
	= new TreatmentDecorator(new GetUserRoomCodeController(getUserRoomCode), logRepositoryAdapter);

export const getRoomCodeController = new TreatmentDecorator(new GetRoomCodeController(getRoomCode), logRepositoryAdapter);

export const deleteRoomController = new TreatmentDecorator(new DeleteRoomController(deleteRoom), logRepositoryAdapter);