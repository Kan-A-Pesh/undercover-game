export type Member = {
  isHost: boolean;
  isYou: boolean; // can be replaced by a userId
  username: string;
  avatar: string;
};