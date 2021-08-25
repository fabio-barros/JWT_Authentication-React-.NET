import "../styles/App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import Header from "../components/Header";
import Home from "../components/pages/Home";
import { Dispatch, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { ApplicationState } from "../redux/store";
import { authenticateAction, isAuthenticatedState } from "../redux/ducks/auth";

function App() {
    const dispatch: Dispatch<any> = useDispatch();

    const isAuthenticatedResponse: isAuthenticatedState = useSelector(
        (state: ApplicationState) => {
            return state.isAuthenticated;
        }
    );
    const { loading, error, data } = isAuthenticatedResponse;

    // useEffect(() => {
    //     (async () => {
    //         dispatch(authenticateAction());
    //     })();
    // }, [dispatch]);

    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Container className="main-wrapper">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={() => (
                                <Home userData={isAuthenticatedResponse} />
                            )}
                        />
                        <Route exact path="/auth/login" component={Login} />
                        <Route
                            exact
                            path="/auth/register"
                            component={Register}
                        />
                    </Switch>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
