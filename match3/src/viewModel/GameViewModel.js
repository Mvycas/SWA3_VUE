// GameViewModel.js
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { initBoard, moveTile, canMove } from '../model/GameModel';
import randomIntFromInterval from '../helper/randomIntFromInterval';

export default function GameViewModel() {
  const store = useStore();

  const remainingTime = ref(0);
  const firstSelectedTile = ref(null);
  const isGameRunning = computed(() => store.state.game.isRunning);
//   const currentBoardArrangement = computed(() => store.getters['game/getBoard']);
  const score = computed(() => store.state.game.board.score);
  const gameId = computed(() => store.state.game.gameId);
  const token = computed(() => store.getters['login/token']);
//   const isLoggedIn = computed(() => store.state.login.isLoggedIn);
  const isLoggedIn = computed(() => store.getters['login/isLogged']);
//   const tiles = computed(() => currentBoardArrangement.value.board.tiles);
const board = computed(() => store.getters['game/getBoard']);
const tiles = computed(() => store.getters['game/getTiles']);

const isTileSelected = (rowIndex, colIndex) => {
  return (firstSelectedTile.value &&
    firstSelectedTile.value.row === rowIndex &&
    firstSelectedTile.value.col === colIndex);
};

const handleTileClick = (rowIndex, colIndex) => {
    const currentPosition = { row: rowIndex, col: colIndex };

    // Check if firstSelectedTile has been set
    if (firstSelectedTile.value) {
        // Check if the move is valid randomColorArrangement, gameId, userToken, score, timeLeft
        if (canMove(board.value, firstSelectedTile.value, currentPosition)) {
            const newBoard = moveTile(firstSelectedTile.value, currentPosition, board.value);
            store.dispatch('game/saveBoard', { 
                board: newBoard.board, 
                gameId: gameId.value, 
                userToken: token.value,
                score: score.value, 
                remainingTime: remainingTime.value 
            });
        }
        // Reset firstSelectedTile after the move
        firstSelectedTile.value = null;
    } else {
        // Set firstSelectedTile if not already set
        firstSelectedTile.value = currentPosition;
    }
};


  const createNewGame = async () => {
    console.log(tiles.value);
    console.log(board.value.tiles);
    const newTimeAllocated = randomIntFromInterval(60, 290);
    await store.dispatch('game/startNewGame', {board: initBoard(), token: token.value, timeAllocated: newTimeAllocated} );
    remainingTime.value = newTimeAllocated;
    firstSelectedTile.value = null;
  };

  const handleLogout = async () => {
    await store.dispatch('login/handleLogout');
};

  return {
    isTileSelected,
    remainingTime,
    firstSelectedTile,
    isGameRunning,
    tiles,
    board,
    score,
    gameId,
    isLoggedIn,
    handleTileClick,
    createNewGame,
    handleLogout
  };
}


