export const resolvers = `
    type Mutation {
        createUser(data: CreateUserInput): String! 
    }

    type Mutation {
        deleteUser(data: DeleteUserInput): String! 
    }

    type Query {
        getUsername: String!
    }

    type Mutation {
        recoverUserPassword(data: RecoverUserPasswordInput): String! 
    }

    type Mutation {
        sendUserEmailUpdateLink(data: SendUserEmailUpdateLinkInput): String! 
    }

    type Mutation {
        sendUserPasswordRecoveryLink(data: SendUserPasswordRecoveryLinkInput): String! 
    }

    type Mutation {
        updateUserEmail(data: UpdateUserEmailInput): String! 
    }

    type Mutation {
        updateUserPassword(data: UpdateUserPasswordInput): String! 
    }

    type Mutation {
        updateUsername(data: UpdateUsernameInput): String! 
    }

    type Mutation {
        userLogin(data: UserLoginInput): String! 
    }

    type Mutation {
        userVerifyEmail(data: UserVerifyEmailInput): String! 
    }

    type Mutation {
        createRoom(data: CreateRoomInput): RoomModel! 
    }

    type Mutation {
        deleteRoom(data: DeleteRoomInput): RoomModel! 
    }

    type Query {
        getRoom(data: GetRoomInput): RoomModel! 
    }

    type Query {
        getRoomCode(data: GetRoomCodeInput): Boolean! 
    }

    type Query {
        getUserRoomCode: String
    }

    type Mutation {
        createQuestion(data: CreateQuestionInput): QuestionModel! 
    }

    type Query {
        getUserQuestions: [QuestionModel] 
    }

    type Mutation {
        deleteQuestion(data: DeleteQuestionInput): QuestionModel! 
    }

    type Mutation {
        createResponse(data: CreateResponseInput): ResponseModel! 
    }
`;