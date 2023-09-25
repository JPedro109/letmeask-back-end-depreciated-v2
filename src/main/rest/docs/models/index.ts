export const responseModel = {
	type: "object",
	properties: {
		id: {
			type: "string"
		},

		questionId: {
			type: "string"
		},

		response: {
			type: "string"
		}
	}
};

export const questionModel = {
	type: "object",
	properties: {
		id: {
			type: "string"
		},

		userId: {
			type: "string"
		},

		question: {
			type: "string"
		},

		response: responseModel
	}
};

export const roomModel = {
	type: "object",
	properties: {
		id: {
			type: "string"
		},

		userId: {
			type: "string"
		},

		code: {
			type: "string"
		},

		name: {
			type: "string"
		},
		
		questions: {
			type: "array",
			items: questionModel
		}
	}
};