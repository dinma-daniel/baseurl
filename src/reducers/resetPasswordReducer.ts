interface ResetPasswordState {
	emailAddress: string;
	message: string;
	error: string;
	loading: boolean;
}

type ResetPasswordAction =
	| { type: 'field'; field: keyof ResetPasswordState; value: string }
	| { type: 'update' }
	| { type: 'success' }
	| { type: 'error'; error: string };

const initialState: ResetPasswordState = {
	emailAddress: '',
	message: '',
	error: '',
	loading: false,
};

function resetPasswordReducer(
	state: ResetPasswordState,
	action: ResetPasswordAction
): ResetPasswordState {
	switch (action.type) {
		case 'field':
			return {
				...state,
				[action.field]: action.value,
			};
		case 'update':
			return {
				...state,
				error: '',
				loading: true,
			};
		case 'success':
			return {
				...state,
				message: 'Please check your email for further instructions',
				loading: false,
			};
		case 'error':
			return {
				...state,
				error: action.error,
				emailAddress: '',
				message: 'Failed to reset password',
				loading: false,
			};
		default:
			return state;
	}
}

export { initialState, resetPasswordReducer };
