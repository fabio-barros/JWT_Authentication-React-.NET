import axios from "axios";

import { Dispatch, FC, FormEvent, Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { UserInfo, UserInfoInput } from "../../interfaces/IUser";
import { signUpAction, SignUpState } from "../../redux/ducks/auth";
import { ApplicationState } from "../../redux/store";
import RegisterForm from "../RegisterForm";

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
    const [firstNameReg, setFirstNameReg] = useState("");
    const [lastNameReg, setLastNameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const dispatch: Dispatch<any> = useDispatch();

    const userRegisterResponse: SignUpState = useSelector(
        (state: ApplicationState) => {
            return state.SignUp;
        }
    );
    const { loading, error, data } = userRegisterResponse;

    const registerHandler = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(
            signUpAction({
                email: emailReg,
                firstName: firstNameReg,
                lastName: lastNameReg,
                password: passwordReg,
            })
        );
    };

    if (userRegisterResponse.data) {
        return <Redirect to="/auth/login" />;
    }

    return (
        <>
            <Row>
                <Col>
                    <RegisterForm
                        setFirstNameReg={setFirstNameReg}
                        setLastNameReg={setLastNameReg}
                        setEmailReg={setEmailReg}
                        setPasswordReg={setPasswordReg}
                        registerHandler={registerHandler}
                        userRegResponse={userRegisterResponse}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Register;
