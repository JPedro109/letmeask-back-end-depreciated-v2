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
	logFacade
} from "@/main/factories";

export const createRoomController = new TreatmentDecorator(new CreateRoomController(createRoom), logFacade);

export const getRoomController = new TreatmentDecorator(new GetRoomController(getRoom), logFacade);

export const getUserRoomCodeController 
	= new TreatmentDecorator(new GetUserRoomCodeController(getUserRoomCode), logFacade);

export const getRoomCodeController = new TreatmentDecorator(new GetRoomCodeController(getRoomCode), logFacade);

export const deleteRoomController = new TreatmentDecorator(new DeleteRoomController(deleteRoom), logFacade);