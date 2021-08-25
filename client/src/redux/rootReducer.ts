import { combineReducers } from "redux";
import {
    isAuthenticatedReducer,
    signInReducer,
    signOutReducer,
    signUpReducer,
} from "./ducks/auth";

const reducers = combineReducers({
    SignIn: signInReducer,
    isAuthenticated: isAuthenticatedReducer,
    SignOut: signOutReducer,
    SignUp: signUpReducer,
});

export default reducers;
