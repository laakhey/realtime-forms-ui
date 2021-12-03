export interface IFormFocusPayload {
    type: "focus" | "blur" | "input";
    formId: string;
    value?: string;
    user?: string;
}

export interface IUser {
    id: string;
    name: string;
    avatar: string;
}
