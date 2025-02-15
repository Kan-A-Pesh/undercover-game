export default interface ClientToServerEvents {
  "room:join": (token?: string) => void;
  "room:create": (arg:string, callback: (token: string) => void ) => void;
}
