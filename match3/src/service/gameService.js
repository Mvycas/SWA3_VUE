// GameService.js
const API_BASE_URL = 'http://localhost:9090'; // PUT IT IN GAMECONSTANT FILE LATER / MULTIPLE USAGE IN BETWEEN FILES

  async function saveBoard(gameId, userToken, score, timeLeft) {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${gameId}?token=${userToken}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score, userToken, timeLeft }),
      });

      if (!response.ok) {
        throw new Error("Failed to save board");
      }
      return await response.json();
    } catch (error) {
      return Promise.reject(error.message || "Unknown error occurred");
    }
  }

  async function endGame(gameId, userToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${gameId}/?token=${userToken}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to end game");
      }
      return await response.json();
    } catch (error) {
      return Promise.reject(error.message || "Unknown error occurred");
    }
  }

  async function startNewGame(userToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/games?token=${userToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to start a new game");
      }
      return await response.json();
    } catch (error) {
      return Promise.reject(error.message || "Unknown error occurred");
    }
  }


export {saveBoard, endGame, startNewGame};
