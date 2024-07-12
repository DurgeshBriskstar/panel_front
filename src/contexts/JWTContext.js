import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// utils
import axios from '../utils/axios';
// ----------------------------------------------------------------------
import { isValidToken, setSession } from '../utils/jwt';

// initial state
const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    response: {
        status: true,
        message: null,
    }
};

// handlers
const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated, response, user } = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            response,
            user,
        };
    },
    ACCOUNT: (state, action) => {
        const { response } = action.payload;
        return {
            ...state,
            isAuthenticated: true,
            response,
        };
    },
    LOGIN: (state, action) => {
        const { user, response } = action.payload;
        if (user !== null && user !== undefined && user !== '') {
            if (user.loginCount === 1) {
                localStorage.setItem("firstLogin", true);
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
        localStorage.setItem("firstLogin", false);
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
    account: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
    children: PropTypes.node,
};

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        initializeAuth();
    }, []);

    const initializeAuth = async () => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');

            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);
                const response = await axios.get('/api/users/information');
                const user = response.data;
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: true,
                        response: {
                            status: response.status,
                            message: response.message
                        },
                        user,
                    },
                });
            } else {
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        } catch (err) {
            dispatch({
                type: 'INITIALIZE',
                payload: {
                    isAuthenticated: false,
                    response: {
                        status: false,
                        message: err.message
                    },
                    user: null,
                },
            });
        }
    };

    const account = async (data, type = "general") => {
        const response = await axios.post(`/api/users/${type}/update`, data);
        if (response.status) {
            initializeAuth();
            dispatch({
                type: 'ACCOUNT',
                payload: {
                    response: {
                        success: response.success,
                        message: response.message
                    },
                    user: response.data,
                },
            });

            const accessToken = window.sessionStorage.getItem('accessToken');
            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);
                const user = response.data;
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: true,
                        response: {
                            success: response.success,
                            message: response.message
                        },
                        user,
                    },
                });
            }
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    };

    const login = async (email, password, mixPanel) => {
        const response = await axios.post('/api/auth/signin', {
            email,
            password,
            mixPanel
        }).then((response) => {
            if (response.status) {
                const { token, user } = response.data;

                if (initializeAuth()) {
                    if (response.status) {
                        setSession(token);
                        initializeAuth();
                        dispatch({
                            type: 'LOGIN',
                            payload: {
                                response: {
                                    status: response.status,
                                    message: response.message
                                },
                                user,
                            },
                        });
                        return Promise.resolve(response);
                    }
                    return Promise.reject(response);
                }
            }
        }).catch((error) => {
            enqueueSnackbar(error, { variant: 'error' });
            return Promise.reject(error);
        });
        return Promise.reject(response);
    };

    const logout = async () => {
        state.isLoading = true;
        // const response = await axios.get('/api/auth/logout');
        const response = { status: true, message: "Logged out successfully!" };
        if (response.status) {
            setSession(null);
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
                account,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
