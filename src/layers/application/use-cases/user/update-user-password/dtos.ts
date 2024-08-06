export type UpdateUserPasswordDTO = {
    id: string;
    password: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export type UpdateUserPasswordResponseDTO = string;