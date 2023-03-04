/* eslint-disable @typescript-eslint/no-unused-vars */

import { 
	CreateUserDTO,
	CreateUserResponseDTO,
	CreateUserUseCaseProtocol,
	DeleteUserDTO,
	DeleteUserResponseDTO,
	DeleteUserUseCaseProtocol,
	GetUsernameDTO,
	GetUsernameResponseDTO,
	GetUsernameUseCaseProtocol,
	RecoverUserPasswordDTO,
	RecoverUserPasswordResponseDTO,
	RecoverUserPasswordUseCaseProtocol,
	SendUserEmailUpdateLinkDTO,
	SendUserEmailUpdateLinkResponseDTO,
	SendUserEmailUpdateLinkUseCaseProtocol,
	SendUserPasswordRecoveryLinkDTO,
	SendUserPasswordRecoveryLinkResponseDTO,
	SendUserPasswordRecoveryLinkUseCaseProtocol,
	UpdateUserEmailDTO,
	UpdateUserEmailResponseDTO,
	UpdateUserEmailUseCaseProtocol,
	UpdateUserPasswordDTO,
	UpdateUserPasswordResponseDTO,
	UpdateUserPasswordUseCaseProtocol,
	UpdateUsernameDTO,
	UpdateUsernameResponseDTO,
	UpdateUsernameUseCaseProtocol,
	UserLoginDTO,
	UserLoginResponseDTO,
	UserLoginUseCaseProtocol,
	UserVerifyEmailDTO,
	UserVerifyEmailResponseDTO,
	UserVerifyEmailUseCaseProtocol    
} from "@/layers/use-cases";

export class CreateUserStub implements CreateUserUseCaseProtocol {
	async execute({ email, password, passwordConfirm }: CreateUserDTO): Promise<CreateUserResponseDTO> {
		return email;
	}
}

export class DeleteUserStub implements DeleteUserUseCaseProtocol {
	async execute({ id, password, passwordConfirm }: DeleteUserDTO): Promise<DeleteUserResponseDTO> {
		return id;
	}
}

export class GetUsernameStub implements GetUsernameUseCaseProtocol {
	async execute({ id }: GetUsernameDTO): Promise<GetUsernameResponseDTO> {
		return "username";
	}
}

export class RecoverUserPasswordStub implements RecoverUserPasswordUseCaseProtocol {
	async execute({ email, code, password, passwordConfirm }: RecoverUserPasswordDTO): Promise<RecoverUserPasswordResponseDTO> {
		return email;
	}
}

export class SendUserEmailUpdateLinkStub implements SendUserEmailUpdateLinkUseCaseProtocol {
	async execute({ id, email }: SendUserEmailUpdateLinkDTO): Promise<SendUserEmailUpdateLinkResponseDTO> {
		return id;
	}
}

export class SendUserPasswordRecoveryLinkStub implements SendUserPasswordRecoveryLinkUseCaseProtocol {
	async execute({ email }: SendUserPasswordRecoveryLinkDTO): Promise<SendUserPasswordRecoveryLinkResponseDTO> {
		return email;
	}

}

export class UpdateUserEmailStub implements UpdateUserEmailUseCaseProtocol {
	async execute({ id, email, code }: UpdateUserEmailDTO): Promise<UpdateUserEmailResponseDTO> {
		return id;
	}
}

export class UpdateUserPasswordStub implements UpdateUserPasswordUseCaseProtocol {
	async execute({ id, password, newPassword, newPasswordConfirm }: UpdateUserPasswordDTO): Promise<UpdateUserPasswordResponseDTO> {
		return id;
	} 
}

export class UpdateUsernameStub implements UpdateUsernameUseCaseProtocol {
	async execute({ id, username }: UpdateUsernameDTO): Promise<UpdateUsernameResponseDTO> {
		return username;
	} 
}

export class UserLoginStub implements UserLoginUseCaseProtocol {
	async execute({ email, password }: UserLoginDTO): Promise<UserLoginResponseDTO> {
		return "code";
	} 
}

export class UserVerifyEmailStub implements UserVerifyEmailUseCaseProtocol {
	async execute({ email, code }: UserVerifyEmailDTO): Promise<UserVerifyEmailResponseDTO> {
		return email;
	}
}