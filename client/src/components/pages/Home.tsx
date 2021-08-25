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

interface HomeProps {}

const Home: FC<HomeProps> = () => {
    const [user, setUser] = useState<UserInfo>();
    const dispatch: Dispatch<any> = useDispatch();

    const isAuthenticatedResponse: isAuthenticatedState = useSelector(
        (state: ApplicationState) => {
            return state.isAuthenticated;
        }
    );
    const { loading, error, data } = isAuthenticatedResponse;

    useEffect(() => {
        (async () => {
            dispatch(authenticateAction());
        })();
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : !error?.noReponse ? (
                <Message variant={data ? "success" : "info"}>
                    {data?.id
                        ? `Hi, ${data?.firstName}`
                        : "Please Login or Register."}
                </Message>
            ) : (
                <Message variant="danger">{error?.noReponse}</Message>
            )}
        </>
    );
};

export default Home;
