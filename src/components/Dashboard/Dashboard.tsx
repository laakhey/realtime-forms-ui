import React, { HTMLInputTypeAttribute, MouseEventHandler, useEffect, useLayoutEffect, useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { config } from "../../configs/index.config";
import { UserEvents } from "../../events/events";
import Nav from "../App/Nav";
import "./Dashboard.css";

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
    const [activeUsers, setActiveUsers] = useState<any[]>([]);

    const [events, setEvents] = useState<UserEvents>();

    useEffect(() => {
        if (!events) {
            const onConnect = async () => {
                const response = await fetch(`${config.apiUrl}/active/${props.opportunityId}`, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "applicantion/json"
                    }
                });
                const { users = [] } = await response.json();
                setActiveUsers(users);
            }

            const onJoin = (payload: string) => {
                const isUserPresent = activeUsers.some(user => user === payload);
                if (!isUserPresent) setActiveUsers((prevState) => {
                    return [...prevState, payload]
                })
            }

            const onLeave = (payload: string) => {
                setActiveUsers((prevUsers) => {
                    return prevUsers.filter(user => user !== payload)
                })
            }

            const socket = new UserEvents(props.opportunityId, props.username, onConnect, onJoin, onLeave);
            setEvents(socket);
            return () => {
                socket?.leave()
            };
        }
    }, [props.opportunityId, props.username, setEvents, setActiveUsers]);

    useLayoutEffect(() => {
        const data = Array.from(document.getElementsByClassName('dashboard-input'));

        console.log(data);

        data.forEach((item) => {
            item.addEventListener('keyup', (e: any) => {
                const value = e.target.value;

                if (value) {
                    events?.sendInputEvent({
                        formId: item.id,
                        type: "input",
                        value
                    });
                }
            });
        })
    });

    return (
        <>
            <div className="row">
                <Nav users={activeUsers} events={events} />
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
