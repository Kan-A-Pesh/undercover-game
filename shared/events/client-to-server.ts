export default interface ClientToServerEvents {
  "room:join": (token?: string) => void;
  "room:create": (blabla:string, callback: (token: string) => void ) => void;
}
