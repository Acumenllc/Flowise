// action - customization reducer
import axios from 'axios'
export const SET_MENU = '@customization/SET_MENU'
export const MENU_TOGGLE = '@customization/MENU_TOGGLE'
export const MENU_OPEN = '@customization/MENU_OPEN'
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY'
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS'
export const SET_LAYOUT = '@customization/SET_LAYOUT '
export const SET_DARKMODE = '@customization/SET_DARKMODE'

// action - canvas reducer
export const SET_DIRTY = '@canvas/SET_DIRTY'
export const REMOVE_DIRTY = '@canvas/REMOVE_DIRTY'
export const SET_CHATFLOW = '@canvas/SET_CHATFLOW'
export const SHOW_CANVAS_DIALOG = '@canvas/SHOW_CANVAS_DIALOG'
export const HIDE_CANVAS_DIALOG = '@canvas/HIDE_CANVAS_DIALOG'
export const SET_COMPONENT_NODES = '@canvas/SET_COMPONENT_NODES'
export const SET_COMPONENT_CREDENTIALS = '@canvas/SET_COMPONENT_CREDENTIALS'

// action - notifier reducer
export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR'

// action - dialog reducer
export const SHOW_CONFIRM = 'SHOW_CONFIRM'
export const HIDE_CONFIRM = 'HIDE_CONFIRM'

// action - auth reducer
export const VERIFY = 'VERIFY'
export const LOGOUT = 'LOGOUT'
export const LOADING = 'LOADING'

export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random()
        }
    }
}

export const closeSnackbar = (key) => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key
})

export const removeSnackbar = (key) => ({
    type: REMOVE_SNACKBAR,
    key
})

export const verifyToken = () => {
    const token = localStorage.getItem('token')
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING }) // Dispatch loading action before making the API call
            const response = await axios.get('/api/v1/auth/verify', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.status === 200) {
                const data = response.data
                // Token verification successful
                dispatch({ type: VERIFY, payload: { email: data.email, name: data.name } })
            } else {
                // Token verification failed
                dispatch({ type: LOGOUT, payload: { email: '', name: '' } }) // Added closing parenthesis
            }
        } catch (error) {
            console.error('Error verifying token:', error)
            dispatch({ type: LOGOUT, payload: { email: '', name: '' } }) // Added closing parenthesis
        }
    }
}
