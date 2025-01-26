/**
 * Generate a random number between 0 and 1 using a seed
 * @param seedX The seed for the x-axis
 * @param seedY The seed for the y-axis
 * @returns A random number between 0 and 1
 */
export function random(seedX: number, seedY: number) {
  return (Math.sin(Math.sin(seedX) * 17503.682 + Math.sin(seedY) * 15938.58103) * 43758.5453) % 1;
}

export function parseColor(color: string, alpha: number) {
  return color.replace("{ALPHA}", alpha.toString());
}
