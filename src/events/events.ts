import { io, Socket } from "socket.io-client";
import { config } from "../configs/index.config";
import { IUser } from "../data/interfaces";

export class UserEvents {
    private user: IUser
    private onConnectCb: Function;
    private opportunityId: string;
    private socket: Socket;

    constructor(opportunityId: string, onConnectCb: Function, name?: string) {
        this.onConnectCb = onConnectCb;
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
        })
    }

    private join() {
        this.socket.emit("JOIN", this.toSocketJson());
    }

    private leave() {
        this.socket.disconnect();
    }

    public connect() {
        return io(config.socketUrl, config.socketConnOpts);
    }

    public toSocketJson() {
        return { user: this.user, opportunityId: this.opportunityId };
    }
}