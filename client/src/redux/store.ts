import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { isAuthenticatedState, SignInState, SignUpState } from "./ducks/auth";
import reducers from "./rootReducer";

export interface ApplicationState {
    SignIn: SignInState;
    isAuthenticated: isAuthenticatedState;
    SignUp: SignUpState;
}

const middlewares = [thunk];

const logger = createLogger();

const store: Store<ApplicationState> = createStore(
    reducers,
    // initialState,
    composeWithDevTools(applyMiddleware(...middlewares, logger))
);

export default store;
