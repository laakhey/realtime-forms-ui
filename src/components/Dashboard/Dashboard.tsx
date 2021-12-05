import React, {HTMLInputTypeAttribute, MouseEventHandler, useEffect, useLayoutEffect, useState} from "react";
import {Col, Form, Row} from "reactstrap";
import {config} from "../../configs/index.config";
import {IFormFocusPayload} from "../../data/interfaces";
import {UserEvents} from "../../events/events";
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
    const [events, setEvents] = useState<UserEvents>();

    useLayoutEffect(() => {
        console.log("useEffect");
        if (!events) {
            console.log("initializing events");
            const onConnect = async () => {
                console.log("onConnect");
                const response = await fetch(`${config.apiUrl}/active/${props.opportunityId}`, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                });
                const {users = []} = await response.json();
                setActiveUsers(users);
            }

            const onJoin = (payload: string) => {
                console.log("onJoin");
                const isUserPresent = activeUsers.some(user => user === payload);
                if (!isUserPresent) setActiveUsers((prevState) => {
                    return [...prevState, payload]
                })
            }

            const onLeave = (payload: string) => {
                console.log("onLeave");
                setActiveUsers((prevUsers) => {
                    return prevUsers.filter(user => user !== payload)
                })
            }

            const onFocusInput = (payload: IFormFocusPayload) => {
                console.log("onFocusInput", payload);
                const element = (document.getElementById(payload.formId) as HTMLInputElement);
                const usernameSpan = (document.getElementById(`name-span-${payload.formId}`) as HTMLSpanElement);

                if (payload.type === "blur") {
                    if (element && usernameSpan) {
                        element.blur();
                        element.classList.remove("focused");
                        usernameSpan.innerText = "";
                        element.readOnly = false;
                    }

                } else if (payload.type === "focus") {
                    if (element && usernameSpan) {
                        element.focus();
                        element.classList.add("focused");
                        element.readOnly = true;
                        usernameSpan.innerText = payload.user as string;
                    }

                } else if (payload.type === "input") {
                    if (element && usernameSpan) {
                        element.value = payload.value as string;
                    }
                }
            }

            const socket = new UserEvents(props.opportunityId, props.username, onConnect, onJoin, onLeave, onFocusInput);
            setEvents(socket);
            const data = Array.from(document.getElementsByClassName('dashboard-input'));

            data.forEach((item) => {
                item.addEventListener('keyup', (e: any) => {
                    console.log("keyup");
                    const value = e.target.value;

                    if (value) {
                        socket?.sendInputEvent({
                            formId: item.id,
                            type: "input",
                            value
                        });
                    }
                });
                item.addEventListener('focus', () => {
                    socket?.sendInputEvent({
                        formId: item.id,
                        type: "focus",
                    })
                })

                item.addEventListener('blur', () => {
                    socket?.sendInputEvent({
                        formId: item.id,
                        type: "blur",
                    })
                })
            })
            return () => {
                socket?.leave()
            };
        }
    }, [props.opportunityId, props.username, setEvents, setActiveUsers]);

    return (
        <>
            <div className="row">
                <Nav users={activeUsers} events={events}/>
            </div>
            <h1>Welcome {props.username}</h1>
            <h2>Opportunity Id: {props.opportunityId}</h2>
            <Form className="dashboard-form">
                <h1 className="text-center m-4">HLE Hackathon</h1>
                <Row xs="2">
                    <Col>
                        <FormInput
                            id="firstName"
                            label="First Name"
                            placeholder="First Name"
                        />
                    </Col>
                    <Col>
                        <FormInput
                            id="lastName"
                            placeholder="Last Name"
                            label="Last Name"
                        />
                    </Col>
                    <Col>
                        <FormInput
                            id="email"
                            placeholder="Email"
                            label="Email"
                        />
                    </Col>
                    <Col>
                        <FormInput
                            id="contactNumber"
                            placeholder="Contact Number"
                            label="Contact Number"
                        />
                    </Col>
                    <Col>
                        <FormInput
                            id="address"
                            placeholder="Address"
                            label="Address"
                        />
                    </Col>
                </Row>
            </Form>
        </>
    )
}
