import { io, Socket } from "socket.io-client";
import { config } from "../configs/index.config";
import { IFormFocusPayload, IUser } from "../data/interfaces";

type SocketCb = ((...args: any[]) => void);
export class UserEvents {
    private user: IUser
    private onConnectCb: Function;
    private opportunityId: string;
    private socket: Socket;
    private onJoin: SocketCb;
    private onLeave: SocketCb;
    private onFocusInput: SocketCb;

    constructor(opportunityId: string, name: string, onConnectCb: Function, onJoin: SocketCb, onLeave: SocketCb, onFocusInput: SocketCb) {
        this.onConnectCb = onConnectCb;

        this.onJoin = onJoin;
        this.onLeave = onLeave;
        this.onFocusInput = onFocusInput;

        this.opportunityId = opportunityId;
        this.user = {
            name: name ?? "Random Name",
            avatar: "avatar",
            id: "id",
        }

        this.socket = this.connect();
        this.onConnect();
    }

    private onConnect() {
        this.socket.on("connect", () => {
            this.onConnectCb();
            this.socket.on("JOIN", this.onJoin);
            this.socket.on("LEAVE", this.onLeave);
            this.socket.on("FORM_FOCUS", this.onFocusInput);
        })
    }

    private join() {
        this.socket.emit("JOIN", this.toSocketJson());
    }

    private connect() {
        if (!this.socket || !this.socket.connected)
            return io(
                `${config.socketUrl}/?opportunityId=${this.opportunityId}&user=${this.user.name}`,
                config.socketConnOpts,
            );
        return this.socket;
    }

    private toSocketJson() {
        return { user: this.user, opportunityId: this.opportunityId };
    }

    sendInputEvent(payload: IFormFocusPayload) {
        console.log("emitting ", payload);
        this.socket?.emit("FORM_FOCUS", payload)
    }

    leave() {
        this.socket.disconnect();
    }
}
