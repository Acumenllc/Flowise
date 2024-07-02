import * as actionTypes from '../actions'

export const initialState = {
    isAuthenticated: false,
    isLoading: false,
    email: '',
    name: ''
}

// ==============================|| AUTH REDUCER ||============================== //

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.VERIFY:
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                isAuthenticated: true,
                isLoading: false
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                email: '',
                name: '',
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state
    }
}

export default authReducer
