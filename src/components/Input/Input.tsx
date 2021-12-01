import { HTMLInputTypeAttribute, MouseEventHandler } from "react";
import "./Input.css";

interface Props {
    title?: string;
    formId: string;
    type?: HTMLInputTypeAttribute | undefined;
    onClick?: MouseEventHandler<HTMLInputElement> | undefined;
    onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function Input(props: Props) {
    return (
        <div className="input-wrapper">
            {props.title && <p className="input-title">{props.title}</p>}
            <input
                className="input"
                type={props.type}
                onClick={props.onClick}
                onChange={props.onChange}
                onFocus={props.onFocus}
                id={props.formId}
            />
        </div>
    )
}
