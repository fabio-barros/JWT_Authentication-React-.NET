import axios from "axios";
import { Dispatch, FC, FormEvent, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { UserInfo } from "../../interfaces/IUser";
import { signInAction, SignInState } from "../../redux/ducks/auth";
import { ApplicationState } from "../../redux/store";
import LoginForm from "../LoginForm";

interface LoginProps {}

type errorType = {
    error: {
        message: string;
        data: string;
    };
};

const Login: FC<LoginProps> = () => {
    const [emailLog, setEmailLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");

    const dispatch: Dispatch<any> = useDispatch();

    const userLoginResponse: SignInState = useSelector(
        (state: ApplicationState) => {
            return state.SignIn;
        }
    );
    const { loading, error, data } = userLoginResponse;

    const loginHandler = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(
            signInAction({
                email: emailLog,
                password: passwordLog,
            })
        );
    };

    if (userLoginResponse.data) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <Row>
                <Col>
                    <LoginForm
                        setEmailLog={setEmailLog}
                        setPasswordLog={setPasswordLog}
                        loginHandler={loginHandler}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Login;
