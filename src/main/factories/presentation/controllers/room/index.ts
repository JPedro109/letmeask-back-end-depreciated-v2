import { 
	CreateRoomController,
	GetRoomController,
	GetRoomCodeController,
	GetUserRoomCodeController,
	DeleteRoomController,
	TreatmentDecoratorHttp
} from "@/layers/presentation";
import { 
	createRoom,
	getRoom,
	getUserRoomCode,
	deleteRoom,
	getRoomCode,
	logFacade
} from "@/main/factories";

export const createRoomController = new TreatmentDecoratorHttp(new CreateRoomController(createRoom), logFacade);

export const getRoomController = new TreatmentDecoratorHttp(new GetRoomController(getRoom), logFacade);

export const getUserRoomCodeController 
	= new TreatmentDecoratorHttp(new GetUserRoomCodeController(getUserRoomCode), logFacade);

export const getRoomCodeController = new TreatmentDecoratorHttp(new GetRoomCodeController(getRoomCode), logFacade);

export const deleteRoomController = new TreatmentDecoratorHttp(new DeleteRoomController(deleteRoom), logFacade);