interface RegisterState {
	username: string;
	email: string;
	password: string;
	error: string;
	loading: boolean;
}

type RegisterAction =
	| { type: 'field'; field: keyof RegisterState; value: string }
	| { type: 'register' }
	| { type: 'success' }
	| { type: 'error'; error: string };

const initialState: RegisterState = {
	username: '',
	email: '',
	password: '',
	error: '',
	loading: false,
};

function registerReducer(
	state: RegisterState,
	action: RegisterAction
): RegisterState {
	switch (action.type) {
		case 'field':
			return {
				...state,
				[action.field]: action.value,
			};
		case 'register':
			return {
				...state,
				error: '',
				loading: true,
			};
		case 'success':
			return {
				...state,
				loading: false,
			};
		case 'error':
			return {
				...state,
				error: action.error,
				loading: false,
				password: '',
			};
		default:
			return state;
	}
}

export { initialState, registerReducer };
