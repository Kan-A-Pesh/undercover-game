import { PlayerProfile } from "#/models/player-profile";
import Text from "@/components/ui/text";
import { getEliminatedQuote } from "@/utils/quotes";
import "./animations.css";

interface EliminatedResultsScreenProps {
  player: PlayerProfile;
}

export default function EliminatedResultsScreen({ player }: EliminatedResultsScreenProps) {
  return (
    <>
      <div className="m-auto w-full max-w-xs border border-white p-4 flex flex-col gap-4 animate-card">
        <div className="flex gap-2 items-center">
          <div className="h-12 w-12 flex-shrink-0 border-white border"></div>
          <div className="flex-1 flex flex-col gap-2">
            <Text>{player.username}</Text>
            <Text type="caption" className="opacity-50 break-all">
              {getEliminatedQuote(player.id)}
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-2 bg-white h-2"></div>
          <div className="col-span-3 bg-secondary h-2"></div>
          <div className="col-span-1 bg-transparent h-2"></div>

          <div className="col-span-1 bg-transparent h-2"></div>
          <div className="col-span-2 bg-white h-2"></div>
          <div className="col-span-1 bg-primary h-2"></div>
          <div className="col-span-2 bg-transparent h-2"></div>

          <div className="col-span-2 bg-primary h-2"></div>
          <div className="col-span-1 bg-transparent h-2"></div>
          <div className="col-span-3 bg-secondary h-2"></div>
        </div>
      </div>

      <div className="fixed inset-0 grid place-items-center">
        <div className="animate-tag border-8 border-primary p-4 ring-8 ring-black/50 bg-black/50 backdrop-blur-sm">
          <Text type="display" color="primary">
            Dead
          </Text>
        </div>
      </div>
    </>
  );
}
