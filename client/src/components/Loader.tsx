import { FC } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

interface LoaderProps {}

export const Loader: FC<LoaderProps> = ({}) => {
    return (
        <Row className="loader-wrapper">
            <Spinner animation="border" role="status" variant="dark">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Row>
    );
};

export const HeaderLoader: FC<LoaderProps> = ({}) => {
    return (
        <>
            <Spinner animation="grow" size="sm" variant="dark" />
            <Spinner animation="grow" size="sm" variant="dark" />
            <Spinner animation="grow" size="sm" variant="dark" />
        </>
    );
};
