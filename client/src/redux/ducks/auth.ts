import axios from "axios";
import { Action, Dispatch, Reducer } from "redux";
import { UserInfo, UserInfoInput } from "../../interfaces/IUser";
import { errorFormat, errorTreatment } from "../errorTreatment";

export enum ActionTypes {
    SIGN_UP_REQUEST = "SIGN_UP_REQUEST",
    SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS",
    SIGN_UP_FAIL = "SIGN_UP_FAIL",

    SIGN_IN_REQUEST = "SIGN_IN_REQUEST",
    SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS",
    SIGN_IN_FAIL = "SIGN_IN_FAIL",

    SIGN_OUT = "SIGN_OUT",

    AUTHENTICATE_REQUEST = "AUTHENTICATE_REQUEST",
    AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS",
    AUTHENTICATE_FAIL = "AUTHENTICATE_FAIL",
}
///ACTIONS
/**
 *
 ** REGISTER
 *
 * */
interface SignUpRequestAction {
    type: ActionTypes.SIGN_UP_REQUEST;
}
interface SignUpSuccessAction {
    type: ActionTypes.SIGN_UP_SUCCESS;
    payload: SignUpResponse;
}
interface SignUpFailAction {
    type: ActionTypes.SIGN_UP_FAIL;
    payload: errorFormat;
}

export type SignUpActionTypes =
    | SignUpRequestAction
    | SignUpSuccessAction
    | SignUpFailAction;

/**
 *
 ** LOGIN
 *
 */
interface SignInRequestAction {
    type: ActionTypes.SIGN_IN_REQUEST;
}
interface SignInSuccessAction {
    type: ActionTypes.SIGN_IN_SUCCESS;
    payload: SignInResponse;
}
interface SignInFailAction {
    type: ActionTypes.SIGN_IN_FAIL;
    payload: errorFormat;
}

export type SignInActionTypes =
    | SignInRequestAction
    | SignInSuccessAction
    | SignInFailAction;

/**
 * *LOGOUT
 */
export type signOutActionTypes = {
    type: ActionTypes.SIGN_OUT;
};

/**
 * * AUTHENTICATE
 */
interface AuthenticateRequestAction {
    type: ActionTypes.AUTHENTICATE_REQUEST;
}

interface AuthenticateSuccessAction {
    type: ActionTypes.AUTHENTICATE_SUCCESS;
    payload: SignUpResponse;
}

interface AuthenticateFailAction {
    type: ActionTypes.AUTHENTICATE_FAIL;
    payload: errorFormat;
}

export type AuthenticateActionTypes =
    | AuthenticateRequestAction
    | AuthenticateSuccessAction
    | AuthenticateFailAction;

//**STATE
export type SignUpInput = UserInfoInput;

export interface SignInInput {
    email: string;
    password: string;
}

export interface SignUpResponse extends UserInfo {}

export interface SignInResponse {
    message: string;
}

export interface SignUpState {
    readonly data?: SignUpResponse;
    readonly loading?: boolean;
    readonly error?: errorFormat;
}

export interface SignInState {
    readonly data?: SignInResponse;
    readonly loading?: boolean;
    readonly error?: errorFormat;
}

export interface isAuthenticatedState {
    readonly data?: SignUpResponse;
    readonly loading?: boolean;
    readonly error?: errorFormat;
}

const SIGN_UP_INITIAL_STATE: SignUpState = {};
const SIGN_IN_INITIAL_STATE: SignInState = {};
const IS_AUTHENTICATED_INITIAL_STATE: isAuthenticatedState = {};

//**ACTION CREATORS
export const signUpAction =
    (input: SignUpInput) => async (dispatch: Dispatch<SignUpActionTypes>) => {
        try {
            dispatch({ type: ActionTypes.SIGN_UP_REQUEST });

            const { data } = await axios.post(
                `${process.env.REACT_APP_API_AUTH}/register`,
                {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    password: input.password,
                }
            );
            dispatch({
                type: ActionTypes.SIGN_UP_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.SIGN_UP_FAIL,
                payload: errorTreatment(error),
            });
        }
    };

export const signInAction =
    ({ email, password }: SignInInput) =>
    async (dispatch: Dispatch<SignInActionTypes>) => {
        try {
            dispatch({ type: ActionTypes.SIGN_IN_REQUEST });

            const res = await axios.post(
                `${process.env.REACT_APP_API_AUTH}/login`,
                {
                    email: email,
                    password: password,
                }
            );

            const data: SignInResponse = res.data;

            dispatch({
                type: ActionTypes.SIGN_IN_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.SIGN_IN_FAIL,
                payload: errorTreatment(error),
            });
        }
    };

export const authenticateAction =
    () => async (dispatch: Dispatch<AuthenticateActionTypes>) => {
        try {
            dispatch({ type: ActionTypes.AUTHENTICATE_REQUEST });

            const { data } = await axios.get(
                `${process.env.REACT_APP_API_AUTH}`
            );

            dispatch({
                type: ActionTypes.AUTHENTICATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.AUTHENTICATE_FAIL,
                payload: errorTreatment(error),
            });
        }
    };

export const signOutAction =
    () => async (dispatch: Dispatch<signOutActionTypes>) => {
        dispatch({ type: ActionTypes.SIGN_OUT });
        localStorage.removeItem("token");
    };

///REDUCERS

export const signUpReducer: Reducer<SignUpState, SignUpActionTypes> = (
    state = SIGN_UP_INITIAL_STATE,
    action: SignUpActionTypes
) => {
    switch (action.type) {
        case ActionTypes.SIGN_UP_REQUEST:
            return { ...state, loading: true };
        case ActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: { message: "", data: "", noReponse: "" },
                data: { ...action.payload },
            };
        case ActionTypes.SIGN_UP_FAIL:
            return {
                ...state,
                loading: false,
                error: { ...action.payload },
                data: SIGN_UP_INITIAL_STATE.data,
            };
        default:
            return state;
    }
};

export const signInReducer: Reducer<SignInState, SignInActionTypes> = (
    state = SIGN_IN_INITIAL_STATE,
    action: SignInActionTypes
) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN_REQUEST:
            return { ...state, loading: true };
        case ActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: { message: "", data: "", noReponse: "" },
                data: { ...action.payload },
            };
        case ActionTypes.SIGN_IN_FAIL:
            return {
                ...state,
                loading: false,
                error: { ...action.payload },
                data: SIGN_IN_INITIAL_STATE.data,
            };
        default:
            return state;
    }
};

export const signOutReducer: Reducer<isAuthenticatedState, signOutActionTypes> =
    (state = IS_AUTHENTICATED_INITIAL_STATE, action: signOutActionTypes) => {
        switch (action.type) {
            case ActionTypes.SIGN_OUT:
                return {
                    ...state,
                    loading: false,
                    error: { message: "", data: "" },
                    isAuthenticated: false,
                };
            default:
                return state;
        }
    };

export const isAuthenticatedReducer: Reducer<
    isAuthenticatedState,
    AuthenticateActionTypes
> = (
    state = IS_AUTHENTICATED_INITIAL_STATE,
    action: AuthenticateActionTypes
) => {
    switch (action.type) {
        case ActionTypes.AUTHENTICATE_REQUEST:
            return { ...state, loading: true };
        case ActionTypes.AUTHENTICATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: { message: "", data: "", noReponse: "" },
                data: action.payload,
            };
        case ActionTypes.AUTHENTICATE_FAIL:
            return {
                ...state,
                loading: false,
                error: { ...action.payload },
                data: IS_AUTHENTICATED_INITIAL_STATE.data,
            };
        default:
            return state;
    }
};
