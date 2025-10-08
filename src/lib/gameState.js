export let gameState = {
    Teams: {},
    Picks: {},
    GameTime: 180,
    GameStatus: "paused",
  };
  
  export const initGameState = (teams, picks) => {
    gameState = {
      Teams: teams,
      Picks: picks,
      GameTime: 180,
      GameStatus: "paused",
    };
  };
  
  export const updateGameState = (newData) => {
    gameState = { ...gameState, ...newData };
  };