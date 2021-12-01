export interface IFormFocusPayload {
    type: "focus" | "defocus" | "input";
    formId: string;
    value: string;
}

export interface IUser {
    id: string;
    name: string;
    avatar: string;
}