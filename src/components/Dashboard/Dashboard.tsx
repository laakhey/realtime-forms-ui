import React, {useEffect, useLayoutEffect} from "react";
import { Form, Row, Col, Label, FormGroup, Input, Container } from "reactstrap";
import { HTMLInputTypeAttribute, MouseEventHandler } from "react";
import "./Dashboard.css"
import { io } from "socket.io-client";
import Nav from "../App/Nav";

interface Props {
    title?: string;
    formId: string;
    username: string;
    opportunityId: string;
    type?: HTMLInputTypeAttribute | undefined;
    onClick?: MouseEventHandler<HTMLInputElement> | undefined;
    onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function Dashboard(props: Props) {
    const socket = io('localhost:8000?user=' + props.username+'&opportunityId='+props.opportunityId);

    useLayoutEffect(() => {
        const data = Array.from(document.getElementsByClassName('dashboard-input'));

        console.log(data);

        data.forEach((item) => {
            item.addEventListener('keyup',  (e: any) => {
                const value = e.target.value;

                if (value) {
                    socket.emit('chat message', value);
                }
            });
        })
    });

    return (
        <>
            <div className="row">
                <Nav />
            </div>
            <h1>Welcome {props.username}</h1>
            <h2>Opportunity Id: {props.opportunityId}</h2>
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
        </>
    )
}
