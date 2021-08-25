import axios from "axios";
import { Dispatch, FC, Fragment, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo } from "../../interfaces/IUser";
import {
    authenticateAction,
    isAuthenticatedState,
} from "../../redux/ducks/auth";
import { ApplicationState } from "../../redux/store";
import { Loader } from "../Loader";
import Message from "../Message";

interface HomeProps {
    userData: isAuthenticatedState;
}

const Home: FC<HomeProps> = ({ userData }) => {
    const [user, setUser] = useState<UserInfo>();

    const dispatch: Dispatch<any> = useDispatch();

    return (
        <>
            {userData.loading ? (
                <Loader />
            ) : !userData.error?.noReponse ? (
                <Message variant={userData.data ? "success" : "info"}>
                    {userData.data
                        ? `Hi, ${userData.data?.firstName}`
                        : "Please Login or Register."}
                </Message>
            ) : (
                <Message variant="danger">{userData.error?.noReponse}</Message>
            )}
        </>
    );
};

export default Home;
