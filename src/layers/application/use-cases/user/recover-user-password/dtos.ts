export type RecoverUserPasswordDTO = {
    email: string;
    code: string;
    password: string;
    passwordConfirm: string;
}

export type RecoverUserPasswordResponseDTO = string;