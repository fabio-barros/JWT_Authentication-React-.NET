import { FC, FormEvent, Fragment } from "react";
import { Button, Card, Form } from "react-bootstrap";

interface LoginFormProps {
    loginHandler: (e: FormEvent<HTMLElement>) => void;
    setEmailLog: React.Dispatch<React.SetStateAction<string>>;
    setPasswordLog: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: FC<LoginFormProps> = ({
    loginHandler,
    setEmailLog,
    setPasswordLog,
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
                <h3>Login</h3>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={loginHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            required
                            onChange={(e) => setEmailLog(e.target.value)}
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
                            onChange={(e) => setPasswordLog(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default LoginForm;
