import { useRef, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { IFormFocusPayload } from "../../data/interfaces";
import { classNames } from "../../utils/utils";
import "./Input.css";

interface Props {
    label: string;
    id: string;
    inputState?: IFormFocusPayload;
    placeholder: string;
    emitUnfocused: (payload: IFormFocusPayload) => void;
}

export default function FormInput(props: Props) {
    const ref = useRef<any>();
    const [value, setValue] = useState<any>();

    const disabled = props.inputState && (props.inputState?.value !== undefined || props.inputState?.value !== null) && props.inputState?.type !== "blur";
    const focused = props.inputState !== null && props.inputState !== undefined && props.inputState?.type !== "blur";

    return (
        <FormGroup>
            <Label for={props.id}>{props.label}</Label>
            <div style={{ position: "relative" }}>
                {props.inputState?.user && props.inputState.type!=="blur" && <span className="user-name">{props.inputState.user}</span>}
                <Input
                    innerRef={ref}
                    id={props.id}
                    name={props.id}
                    placeholder={props.placeholder}
                    value={props.inputState?.value ?? value}
                    disabled={disabled}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    className={classNames({
                        "dashboard-input": true,
                        "focused": focused,
                    })}
                    required={true}
                />
            </div>
        </FormGroup>
    )
}
