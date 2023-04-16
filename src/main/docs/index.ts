import { 
	createUser,
	deleteUser,
	recoverUserPassword,
	sendUserEmailUpdateLink,
	sendUserPasswordRecoverLink,
	updateUserEmail,
	updateUserPassword,
	updateUsername,
	userLogin,
	verifyUserEmail,
	createRoom,
	deleteRoom,
	getRoomCode,
	getRoom,
	getUserRoomCode,
	createQuestion,
	deleteQuestion,
	getUserQuestions,
	createResponse
} from "./paths";

const swaggerJSON = {
	swagger: "2.0",
	info: {
		title: "Api de interação de usuários por meio de salas de perguntas e respostas",
		description: "Aplicação que faz que possiblita interações de usuários por meio de salas de perguntas e respostas",
		version: "1.0.0",
	},
	produces: [
		"application/json"
	],
	tags: [
		{
			name: "Usuário",
			description: "Rotas relacionadas ao usuário"
		},

		{
			name: "Sala",
			description: "Rotas relacionadas a sala"
		},

		{
			name: "Pergunta",
			description: "Rotas relacionadas a questão"
		},

		{
			name: "Resposta",
			description: "Rotas relacionadas a resposta"
		},
	],
	paths: {
		"/api/users": {
			post: createUser,
			delete: deleteUser
		},
		"/api/users/recover-password": {
			post: recoverUserPassword
		},
		"/api/users/send-email-update-link": {
			post: sendUserEmailUpdateLink
		},
		"/api/users/send-password-recovery-link": {
			post: sendUserPasswordRecoverLink

		},
		"/api/users/email": {
			patch: updateUserEmail,
		},
		"/api/users/password": {
			patch: updateUserPassword,
		},
		"/api/users/username": {
			patch: updateUsername,
		},
		"/api/users/login": {
			post: userLogin,
		},
		"/api/users/verify-email": {
			patch: verifyUserEmail,
		},

		"/api/rooms": {
			post: createRoom
		},
		"/api/rooms/{roomCode}": {
			get: getRoom,
			delete: deleteRoom
		},
		"/api/rooms/managed-room": {
			get: getUserRoomCode
		},
		"/api/rooms/exists/{roomCode}": {
			get: getRoomCode
		},

		"/api/questions": {
			post: createQuestion,
			get: getUserQuestions
		},
		"/api/questions/{questionId}": {
			delete: deleteQuestion
		},

		"/api/responses": {
			post: createResponse
		}
	}
};

export default swaggerJSON;