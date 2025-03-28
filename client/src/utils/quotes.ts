const quotes = [
  "Eliminated",
  '"I always return" - this looser',
  "Searching aura...",
  "Sleepin (for a while)",
  "Dead",
  "Got betrayed",
  "Waiting for the next game",
  "zzZ zzZ zzZ",
  '"I was a civilian" - a spy (maybe)',
  "Definitely not a spy (not sure)",
  "Maybe alive (no)",
  "Out of the game",
  "Killed",
  "This was a good game!",
  "I HATE THIS GAME",
];

export const getEliminatedQuote = (seed: string) => {
  // Generate a number from the provided seed
  const number = parseInt(
    seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), ""),
    16,
  );

  // Return the quote at the index of the number
  return quotes[number % quotes.length];
};
