interface ProfileState {
	username: string;
	email: string;
	error: string;
	loading: boolean;
}

type ProfileAction =
	| { type: 'field'; field: keyof ProfileState; value: string }
	| { type: 'update' }
	| { type: 'success' }
	| { type: 'error'; error: string };

const initialState: ProfileState = {
	username: '',
	email: '',
	error: '',
	loading: false,
};

function profileReducer(
	state: ProfileState,
	action: ProfileAction
): ProfileState {
	switch (action.type) {
		case 'field':
			return {
				...state,
				[action.field]: action.value,
			};
		case 'update':
			return {
				...state,
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
			};
		default:
			return state;
	}
}

export { initialState, profileReducer };
