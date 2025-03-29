import Text from "@/components/ui/text";
import TypedText from "@/components/ui/typed-text";

export default function NoVoteResultsScreen() {
  return (
    <div className="m-auto w-full max-w-xs gap-2 p-4 flex flex-col">
      <Text type="title" color="white">
        No elimination
      </Text>
      <Text color="white">
        <TypedText text="No one voted, or there was a tie." />
      </Text>
    </div>
  );
}
