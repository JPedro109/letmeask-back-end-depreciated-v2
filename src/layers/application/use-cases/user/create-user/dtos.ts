export type CreateUserDTO = {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
}

export type CreateUserResponseDTO = string;