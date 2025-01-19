export default interface ClientToServerEvents {
  "room:join": (token?: string) => void;
  "room:create": () => string;
}
