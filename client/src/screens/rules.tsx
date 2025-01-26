import RuleCard from "@/components/layout/rules/rule-card";
import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import { useAppDispatch } from "@/store/hooks";
import { setRoute } from "@/store/slices/router";

export default function RulesScreen() {
  const dispatch = useAppDispatch();

  const handleHome = () => dispatch(setRoute("home"));

  return (
    <div className="flex flex-1 flex-col gap-16 px-4 items-start py-4 md:py-8 lg:py-16">
      <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
        <Text type="display" className="mb-2">
          Rules
        </Text>
        <Button type="outlined" color="primary" size="md" icon="logout" className="w-fit" onClick={handleHome}>
          Go back
        </Button>

        <hr className="my-4 border-t border-t-white w-full" />

        <Text type="title">What is Undercover?</Text>
        <Text type="paragraph">
          Undercover is a social deduction party game where players receive secret roles and a word. Players take turns
          saying words related to their secret word, trying to identify who's on their team while avoiding detection by
          others.
        </Text>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-md lg:max-w-4xl mx-auto">
        <RuleCard
          hatColor="secondary"
          name="Civilian"
          description="Win with other civilians"
          word="Receives a word to work with"
          speak="Must say a word similar to their given word"
          target="Identify and eliminate all spies"
        />
        <RuleCard
          hatColor="primary"
          name="Spy Agent"
          description="Win with other spies & Mr.White"
          word="Receives a slightly different word than civilians"
          speak="Must say a word that could fit either word"
          target="Eliminate all civilians"
        />
        <RuleCard
          hatColor="white"
          name="Mr.White"
          description="Win with other spies"
          word="Receives no word at all"
          speak="Must guess and say a word similar to the civilian's word"
          target="Eliminate all civilians"
          special="If eliminated, Mr.White gets one chance to guess the civilian's word to win"
        />
      </section>
    </div>
  );
}
