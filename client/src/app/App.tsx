import "../styles/App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import Header from "../components/Header";
import Home from "../components/pages/Home";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../redux/store";

function App() {
    // const isAuthenticatedResponse: isAuthenticatedState = useSelector(
    //     (state: ApplicationState) => state.isAuthenticated
    // );

    // const dispatch = useDispatch<any>();
    // console.log(isAuthenticatedError?.message);
    // useEffect(() => {
    //     dispatch(authenticateAction());
    // }, [dispatch]);
    return (
        <div className="App">
            <BrowserRouter>
                <Provider store={store}>
                    <Header />
                    <Container className="main-wrapper">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={() => (
                                    <Home
                                    // userResponseData={isAuthenticatedResponse}
                                    />
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
                </Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
