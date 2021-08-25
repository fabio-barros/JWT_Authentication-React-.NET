import { FC, FormEvent, Fragment } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { UserInfo, UserInfoInput } from "../interfaces/IUser";
import { SignUpState } from "../redux/ducks/auth";

interface RegisterFormProps {
    setFirstNameReg: React.Dispatch<React.SetStateAction<string>>;
    setLastNameReg: React.Dispatch<React.SetStateAction<string>>;
    setEmailReg: React.Dispatch<React.SetStateAction<string>>;
    setPasswordReg: React.Dispatch<React.SetStateAction<string>>;
    registerHandler: (e: FormEvent<HTMLElement>) => void;
    userRegResponse: SignUpState;
}

const RegisterForm: FC<RegisterFormProps> = ({
    setEmailReg,
    setFirstNameReg,
    setLastNameReg,
    setPasswordReg,
    registerHandler,
    userRegResponse,
}) => {
    return (
        <Card
            style={{ width: "40rem", backgroundColor: "#eaeaea" }}
            className="shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 mb-5"
        >
            {/* <h1>{user === undefined ? "howdy" : user.user.firstName}</h1> */}
            <Card.Header
                className=" login-form-card-header bg-transparent border-0 text-center"
                style={{ width: "40rem", backgroundColor: "#ffffff" }}
            >
                <h3>Register</h3>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={registerHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your First Name"
                            required
                            onChange={(e) => setFirstNameReg(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Last Name"
                            required
                            onChange={(e) => setLastNameReg(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            required
                            onChange={(e) => setEmailReg(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            minLength={8}
                            maxLength={20}
                            onChange={(e) => setPasswordReg(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default RegisterForm;
