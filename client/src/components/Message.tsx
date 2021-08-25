import { FC } from "react";
import { Alert } from "react-bootstrap";

interface MessageProps {
    variant: string;
}

export const Message: FC<MessageProps> = ({ variant, children }) => {
    return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
