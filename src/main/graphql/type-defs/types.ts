export const types = `
    type RoomModel {
        id: String!
        userId: String!
        code: String!
        name: String!
        questions: [QuestionModel]!
    }

    type QuestionModel {
        id: String!
        userId: String!
        roomCode: String!
        question: String!
        response: ResponseModel

    }

    type ResponseModel {
        id: String!
        questionId: String!
        response: String!
    }
`;