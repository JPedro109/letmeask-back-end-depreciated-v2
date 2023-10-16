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
	logAdapter
} from "@/main/factories";

export const createRoomController = new TreatmentDecorator(new CreateRoomController(createRoom), logAdapter);

export const getRoomController = new TreatmentDecorator(new GetRoomController(getRoom), logAdapter);

export const getUserRoomCodeController 
	= new TreatmentDecorator(new GetUserRoomCodeController(getUserRoomCode), logAdapter);

export const getRoomCodeController = new TreatmentDecorator(new GetRoomCodeController(getRoomCode), logAdapter);

export const deleteRoomController = new TreatmentDecorator(new DeleteRoomController(deleteRoom), logAdapter);