import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
// ----------------------------------------------------------------------

// initial state
const initialState = {
    isAuthenticated: true,
    user: {
        "firstName": "Super",
        "lastName": "Admin",
        "name": "Super Admin",
        "email": "admin@test.com",
        "gender": "male",
        "role": "admin",
    },
    response: {
        success: true,
        message: null,
    },
    registerStep: {
        activeStep: 0
    }
};

// handlers
const handlers = {
    LOGIN: (state, action) => {
        const { user, response } = action.payload;
        if (user !== null && user !== undefined && user !== '') {
            if (user.loginCount === 1) {
                // sessionStorage.setItem("firstLogin", true);
            }
        }
        return {
            ...state,
            isAuthenticated: true,
            response,
            user,
        };
    },
    LOGOUT: (state) => {
        // sessionStorage.setItem("firstLogin", false);
        return {
            ...state,
            isAuthenticated: false,
            user: null,
        };
    },
};

// reducer
const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

// context
const AuthContext = createContext({
    ...initialState,
    method: 'jwt',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
    children: PropTypes.node,
};

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = async (email, password, mixPanel) => {
        const response = await axios.post('/api/login', {
            email,
            password,
            mixPanel
        });
        const { token, user } = response.data;

        if (response.success) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    response: {
                        success: response.success,
                        message: response.message
                    },
                    user,
                },
            });
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    };

    const logout = async () => {
        state.isLoading = true;
        const response = await axios.get('/api/logout');
        if (response.success) {
            dispatch({ type: 'LOGOUT' });
            return Promise.resolve(response);
        }
        state.isLoading = false;
        return Promise.reject(response);
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
