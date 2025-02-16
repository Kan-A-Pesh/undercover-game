type RoomSettings = {
    players: Set<string>;
    maxPlayer: number;
    mrWhiteCount: number;
    agentCount: number;
    wordAttribution: number;
    wordChoosingDuration: number;
    debateDuration: number;
    votingDuration: number;
};

export default RoomSettings;