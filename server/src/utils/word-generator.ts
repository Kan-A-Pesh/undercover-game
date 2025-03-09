import { words } from "./words";


export function generateWordPair(languages: keyof typeof words) {
    const list = words[languages];

    const distance = Math.floor(Math.random() * 3) + 1;
    const randomIndex = Math.floor(Math.random() * list.length);
    const distanceIndex = (randomIndex + distance) % list.length;

    const word = list[randomIndex];
    const similarWord = list[distanceIndex];

    return {
        word,
        similarWord
    }
}