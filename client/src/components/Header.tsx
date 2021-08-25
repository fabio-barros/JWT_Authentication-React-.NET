import axios from "axios";
import { Dispatch, FC } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { isAuthenticatedState, signOutAction } from "../redux/ducks/auth";
import { ApplicationState } from "../redux/store";

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
    const dispatch: Dispatch<any> = useDispatch();

    const isAuthenticatedResponse: isAuthenticatedState = useSelector(
        (state: ApplicationState) => {
            return state.isAuthenticated;
        }
    );

    const logoutHandler = async () => {
        dispatch(signOutAction());

        // await fetch(`${process.env.REACT_APP_API_AUTH}/logout`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     credentials: "include",
        // });
        // await axios.post(`${process.env.REACT_APP_API_AUTH}/logout`, {
        //     withCredentials: true,
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Content-Type": "application/json",
        //     },
        // });
    };

    const { loading, error, data } = isAuthenticatedResponse;
    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>App</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {loading ? (
                            ""
                        ) : data?.id ? (
                            <LinkContainer
                                to="/auth/login"
                                // onClick={logoutHandler}
                            >
                                <Nav.Link onClick={logoutHandler}>
                                    Sign Out
                                </Nav.Link>
                            </LinkContainer>
                        ) : (
                            <>
                                <LinkContainer to="/auth/login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/auth/register">
                                    <Nav.Link>Register</Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
