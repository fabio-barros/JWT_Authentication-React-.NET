import axios from "axios";
import { Dispatch, FC, Fragment, useEffect, useState } from "react";
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

const Home: FC<HomeProps> = ({}) => {
    const [user, setUser] = useState<UserInfo>();

    const dispatch: Dispatch<any> = useDispatch();

    const isAuthenticatedResponse: isAuthenticatedState = useSelector(
        (state: ApplicationState) => {
            return state.isAuthenticated;
        }
    );
    const { loading, error, data } = isAuthenticatedResponse;

    useEffect(() => {
        const isAuthenticated = async () => {
            dispatch(authenticateAction());
        };
        isAuthenticated();
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error?.noReponse ? (
                <Message variant="danger">{error?.noReponse}</Message>
            ) : (
                <Message variant={data ? "success" : "warning"}>
                    {data
                        ? `Hi, ${data?.firstName}`
                        : "Please Login or Register."}
                </Message>
            )}
        </>
    );
};

export default Home;
