export default interface ClientToServerEvents {
  "auth:login": (token?: string) => void;
}
