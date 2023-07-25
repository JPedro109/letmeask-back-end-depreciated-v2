export const inputs = `
    input CreateUserInput {
        email: String!
        username: String!
        password: String!
        passwordConfirm: String!
    }

    input DeleteUserInput {
        password: String!
        passwordConfirm: String!
    }

    input RecoverUserPasswordInput {
        email: String!
        code: String!
        password: String!
        passwordConfirm: String!
    }

    input SendUserEmailUpdateLinkInput {
        email: String!
    }

    input SendUserPasswordRecoveryLinkInput {
        email: String!
    }

    input UpdateUserEmailInput {
        email: String!
        code: String!
    }

    input UpdateUserPasswordInput {
        password: String!
        newPassword: String!
        newPasswordConfirm: String!
    }

    input UpdateUsernameInput {
        username: String!
    }

    input UserLoginInput {
        email: String!
        password: String!
    }

    input UserVerifyEmailInput {
        email: String!
        code: String!
    }

    input CreateRoomInput {
        roomName: String!
    }

    input DeleteRoomInput {
        roomCode: String!
    }

    input GetRoomInput {
        roomCode: String!
    }

    input GetRoomCodeInput {
        roomCode: String!
    }

    input CreateQuestionInput {
        roomCode: String!
        question: String!
    }

    input DeleteQuestionInput {
        questionId: String!
    }

    input CreateResponseInput {
        questionId: String!
        response: String!
    }
`;