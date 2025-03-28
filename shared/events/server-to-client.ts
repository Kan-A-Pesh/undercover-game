import RoomSettings from "shared/models/room-settings";
import { PlayerProfile } from "shared/models/player-profile";
import { RoomName } from "shared/models/room-name";
import { Role } from "shared/models/role";

type ServerToClientEvents = {
  "player:profile:updated": (playerId: string, profile: PlayerProfile) => void;
  "room:settings:updated": (settings: RoomSettings) => void;
  "room:players:updated": (players: PlayerProfile[]) => void;
  "game:state:updated": (state: RoomName, duration?: number) => void;
  "game:word:attribution": (word: string | null) => void;
  "game:word:choosing": (playerId: string, duration: number) => void;
  "game:word:chosen": (playerId: string, word: string) => void;
  "game:vote:voted": (playerId: string) => void;
  "game:vote:results": (
    votes: { [key: string]: number },
    eliminatedPlayerId: string | null
  ) => void;
  "game:round:ended": (winnerRole?: Role) => void;
};

export default ServerToClientEvents;
