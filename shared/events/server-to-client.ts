import RoomSettings from "shared/models/room-settings";
import { PlayerProfile } from "shared/models/player-profile";
import { RoomName } from "shared/models/room-name";
import { Role } from "shared/models/role";

type ServerToClientEvents = {
  "update:player:profile": (playerId: string, profile: PlayerProfile) => void;
  "update:room:settings": (settings: RoomSettings) => void;
  "update:room:players": (players: PlayerProfile[]) => void;
  "game:state:updated": (state: RoomName, duration?: number) => void;
  "game:word:attribution": (word: string | null) => void;
  "game:word:choosing": (playerId: string) => void;
  "game:word:chosen": (playerId: string, word: string) => void;
  "game:vote:voted": (playerId: string) => void;
  "game:vote:results": (
    votes: { [key: string]: number },
    eliminatedPlayerId: string | null
  ) => void;
  "game:end": (winnerRole: Role) => void;
};

export default ServerToClientEvents;
