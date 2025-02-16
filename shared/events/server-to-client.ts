type ServerToClientEvents = {
  "update:player:username": (playerId: string, newUsername: string) => void;
  "update:player:avatar": (playerId: string, newAvatar: string) => void;
}

export default ServerToClientEvents;