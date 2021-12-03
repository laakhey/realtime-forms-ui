import React, { HTMLInputTypeAttribute, MouseEventHandler, useEffect, useLayoutEffect, useState } from "react";
import { Col, Form, Row } from "reactstrap";
import { config } from "../../configs/index.config";
import { IFormFocusPayload } from "../../data/interfaces";
import { UserEvents } from "../../events/events";
import Nav from "../App/Nav";
import FormInput from "../Input/Input";
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
    const [inputStates, setInputStates] = useState<Record<string, IFormFocusPayload>>({});

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

            const onFocusInput = (payload: IFormFocusPayload) => {
                setInputStates((oldState) => {
                    const newState = { ...oldState };
                    const keys = Object.keys(newState);

                    keys.forEach((key) => {
                        if (newState[key].user === payload.user) {
                            delete newState[key];
                        }
                    });

                    newState[payload.formId] = payload;
                    return newState;
                })
            }

            const socket = new UserEvents(props.opportunityId, props.username, onConnect, onJoin, onLeave, onFocusInput);
            setEvents(socket);
            return () => {
                socket?.leave()
            };
        }
    }, [props.opportunityId, props.username, setEvents, setActiveUsers, setInputStates]);

    useLayoutEffect(() => {
        const data = Array.from(document.getElementsByClassName('dashboard-input'));

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
            item.addEventListener('focus', (e: any) => {
                events?.sendInputEvent({
                    formId: item.id,
                    type: "focus",
                })
            })
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
                        <FormInput
                            id="firstName"
                            label="First Name"
                            placeholder="First Name"
                            inputState={inputStates["firstName"]}
                            emitUnfocused={events?.sendInputEvent!}
                        />
                    </Col>
                    <Col>
                        <FormInput
                            id="lastName"
                            placeholder="Last Name"
                            label="Last Name"
                            inputState={inputStates["lastName"]}
                            emitUnfocused={events?.sendInputEvent!}
                        />
                    </Col>
                    <Col>
                        <FormInput
                            id="email"
                            placeholder="Email"
                            label="Email"
                            inputState={inputStates["email"]}
                            emitUnfocused={events?.sendInputEvent!}
                        />
                    </Col>
                    <Col>
                        <FormInput
                            id="contactNumber"
                            placeholder="Contact Number"
                            label="Contact Number"
                            inputState={inputStates["contactNumber"]}
                            emitUnfocused={events?.sendInputEvent!}
                        />
                    </Col>
                    <Col>
                        <FormInput
                            id="address"
                            placeholder="Address"
                            label="Address"
                            inputState={inputStates["address"]}
                            emitUnfocused={events?.sendInputEvent!}
                        />
                    </Col>
                </Row>
            </Form>
        </>
    )
}
