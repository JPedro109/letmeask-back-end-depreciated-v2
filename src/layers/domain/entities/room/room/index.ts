import { AbstractEntity } from "@/layers/domain/entities/abstract";
import { RoomCode, RoomName, DomainError } from "@/layers/domain";

export type RoomProps = {
    id?: string;
    roomCode: string;
    roomName: string;
}

export type RoomValueObjectsProps = {
    roomCode: RoomCode;
    roomName: RoomName;
}

export class RoomEntity extends AbstractEntity<RoomValueObjectsProps> {

	private constructor(props: RoomValueObjectsProps, id?: string) {
		super(props, id);
	}

	get roomName(): string {
		return this.props.roomName.value;
	}

	set roomName(roomName: string) {
		const result = RoomName.create(roomName);
		if(result instanceof Error) throw result;
		this.props.roomName = result;
	}

	get roomCode(): string {
		return this.props.roomCode.value;
	}

	set roomCode(roomCode: string) {
		const result = RoomCode.create(roomCode);
		if(result instanceof Error) throw result;
		this.props.roomCode = result;
	}

	static create(props: RoomProps): RoomEntity {
		const valueObjects = {
			roomCode: RoomCode.create(props.roomCode),
			roomName: RoomName.create(props.roomName)
		};

		const result = this.validate(valueObjects);

		if(!result.valid) throw new DomainError(result.errors);

		return new RoomEntity({
			roomCode: valueObjects.roomCode as RoomCode,
			roomName: valueObjects.roomName as RoomName
		}, props.id);
	}
}