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

    SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST",
    SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS",
    SIGN_OUT_FAIL = "SIGN_OUT_FAIL",

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
interface SignOutRequestAction {
    type: ActionTypes.SIGN_OUT_REQUEST;
}
interface SignOutSuccessAction {
    type: ActionTypes.SIGN_OUT_SUCCESS;
    payload: SignOutResponse;
}
interface SignOutFailAction {
    type: ActionTypes.SIGN_OUT_FAIL;
    payload: errorFormat;
}
export type signOutActionTypes =
    | SignOutRequestAction
    | SignOutSuccessAction
    | SignOutFailAction;

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

export interface SignOutResponse {
    message: string;
}

interface BasicState {
    readonly loading?: boolean;
    readonly error?: errorFormat;
}

export interface SignUpState extends BasicState {
    readonly data?: SignUpResponse;
}

export interface SignInState extends BasicState {
    readonly data?: SignInResponse;
}

export interface SignOutState extends BasicState {
    readonly data?: SignOutResponse;
}

export interface isAuthenticatedState extends BasicState {
    readonly data?: SignUpResponse;
}

const SIGN_UP_INITIAL_STATE: SignUpState = {};
const SIGN_IN_INITIAL_STATE: SignInState = {};
const IS_AUTHENTICATED_INITIAL_STATE: isAuthenticatedState = {};
const SIGN_OUT_INITIAL_STATE: SignOutState = {};

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
                },
                {
                    withCredentials: true,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
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
                `${process.env.REACT_APP_API_AUTH}/authenticate`,
                {
                    withCredentials: true,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
                }
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
        try {
            dispatch({ type: ActionTypes.SIGN_OUT_REQUEST });
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_AUTH}/logout`,
                null,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            dispatch({
                type: ActionTypes.SIGN_OUT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.SIGN_OUT_FAIL,
                payload: errorTreatment(error),
            });
        }
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

export const signOutReducer: Reducer<SignOutState, signOutActionTypes> = (
    state = SIGN_OUT_INITIAL_STATE,
    action: signOutActionTypes
) => {
    switch (action.type) {
        case ActionTypes.SIGN_OUT_REQUEST:
            return { ...state, loading: true };
        case ActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: { message: "", data: "", noReponse: "" },
                data: { ...action.payload },
            };
        case ActionTypes.SIGN_OUT_FAIL:
            return {
                ...state,
                loading: false,
                error: { ...action.payload },
                data: SIGN_OUT_INITIAL_STATE.data,
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
