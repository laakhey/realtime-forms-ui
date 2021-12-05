import { useRef } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { classNames } from "../../utils/utils";
import "./Input.css";

interface Props {
    label: string;
    id: string;
    placeholder: string;
}

export default function FormInput(props: Props) {
    const ref = useRef<any>();

    return (
        <FormGroup>
            <Label for={props.id}>{props.label}</Label>
            <div style={{ position: "relative" }} id={`div-${props.id}`}>
                <span className="user-name" id={`name-span-${props.id}`}></span>
                <Input
                    innerRef={ref}
                    id={props.id}
                    name={props.id}
                    placeholder={props.placeholder}
                    className={classNames({
                        "dashboard-input": true
                    })}
                    required={true}
                />
            </div>
        </FormGroup>
    )
}
