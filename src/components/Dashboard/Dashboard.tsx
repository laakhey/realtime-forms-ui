import React, { useLayoutEffect } from "react";
import { Form, Row, Col, Label, FormGroup, Input, Container } from "reactstrap";
import { HTMLInputTypeAttribute, MouseEventHandler } from "react";
import "./Dashboard.css"
import { io } from "socket.io-client";

interface Props {
    title?: string;
    formId: string;
    type?: HTMLInputTypeAttribute | undefined;
    onClick?: MouseEventHandler<HTMLInputElement> | undefined;
    onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function Dashboard(props: Props) {
    const socket = io('localhost:8000');

    useLayoutEffect(() => {
        const data = document.getElementsByClassName('dashboard-input');
        //@ts-ignore
        data.forEach(item => {
            item.addEventListener('submit', function (e: any) {
                e.preventDefault();
                if (item.value) {
                    socket.emit('chat message', item.value);
                    item.value = '';
                }
            });
        })
    });

    return (
        <Container>
            <Form className="dashboard-form">
                <h1 className="text-center m-4">HLE Hackathon</h1>
                <Row xs="2">
                    <Col >
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                className="dashboard-input"
                                required={true}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                className="dashboard-input"
                                required={true}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="dashboard-input"
                                type="email"
                                required={true}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="contactNumber">Contact Number</Label>
                            <Input
                                id="contactNumber"
                                name="contactNumber"
                                placeholder="Contact Number"
                                className="dashboard-input"
                                required={true}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input
                                id="address"
                                name="email"
                                placeholder="Address"
                                className="dashboard-input"
                                required={true}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
