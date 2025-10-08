export const buildJson = (teams, picks, gameTime, status) => ({
    matchDetail: {
      gameTotal: 1,
      gameTime,
      gameStatus: status,
    },
    teams,
    picks,
  });
  