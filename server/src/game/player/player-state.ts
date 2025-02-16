type playerState = {
  stateName: string;
  givenWord: string;
  chosenWord: string;
  votedPlayer: string; //player id
  isPlayer: boolean;
}

export default playerState;