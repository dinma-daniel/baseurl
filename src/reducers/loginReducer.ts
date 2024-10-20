interface LoginState {
	email: string;
	password: string;
	error: string;
	loading: boolean;
}

// type LoginAction =
// 	| { type: 'field'; field: keyof LoginState; value: string }
// 	| { type: 'login' }
// 	| { type: 'success' }
// 	| { type: 'error'; error: string };

type LoginAction =
	| {
			type: 'field';
			field: Exclude<keyof LoginState, 'loading'>;
			value: string;
	  }
	| { type: 'field'; field: 'loading'; value: boolean }
	| { type: 'login' }
	| { type: 'success' }
	| { type: 'error'; error: string };

const initialState: LoginState = {
	email: '',
	password: '',
	error: '',
	loading: false,
};

function loginReducer(state: LoginState, action: LoginAction): LoginState {
	switch (action.type) {
		case 'field':
			return {
				...state,
				[action.field]: action.value,
			};
		case 'login':
			return {
				...state,
				loading: true,
				error: '',
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

export { initialState, loginReducer };
