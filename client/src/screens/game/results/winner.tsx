import { Role } from "#/models/role";
import Text from "@/components/ui/text";
import TypedText from "@/components/ui/typed-text";

interface WinnerResultsScreenProps {
  winnerRole: Role | null;
}

export default function WinnerResultsScreen({ winnerRole }: WinnerResultsScreenProps) {
  if (winnerRole === null)
    return (
      <>
        <div className="m-auto">
          <Text type="title" color="white">
            No winner for this round!
          </Text>
        </div>

        <div className="fixed inset-0 grid place-items-center">
          <div className="animate-tag border-8 border-primary p-4 ring-8 ring-black/50 bg-black/50 backdrop-blur-sm">
            <Text type="display" color="primary">
              Next round!
            </Text>
          </div>
        </div>
      </>
    );

  if (winnerRole === Role.MrWhite)
    return (
      <div className="m-auto p-8">
        <Text type="display" color="white">
          <TypedText text="Mr. White found the word!" />
        </Text>
      </div>
    );

  if (winnerRole === Role.Agent)
    return (
      <div className="m-auto p-8">
        <Text type="display" color="white">
          <TypedText text="And the winner are... THE AGENTS!" />
        </Text>
      </div>
    );

  return (
    <div className="m-auto p-8">
      <Text type="display" color="white">
        <TypedText text="And the winner are... THE TOWN!" />
      </Text>
    </div>
  );
}
