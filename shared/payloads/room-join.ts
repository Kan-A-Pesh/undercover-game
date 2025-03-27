import PayloadCreateRoom from "./room-create";

type PayloadJoinRoom = PayloadCreateRoom & {
    token: string;
    roomId?: string;
};

export default PayloadJoinRoom;
