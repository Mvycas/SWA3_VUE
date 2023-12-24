// import  TO SAVE BOARD / UPDATE AND END GAME / START NEW GAME / GET INCOMPLETE GAME BY USER ID
import 
GameService
from "../../service/gameService";

export default {
    namespaced: true,
    state: {
        isRunning: false,
        isEnd: false,
        isPaused: false,
        errorMessage: '',
        gameId: 0,
        allocatedTime: 0,
        remainingTime: 0,
        board: {
            w: 0,
            h: 0,
            tiles: [],
            score: 0
        },
        mutations: {
            saveBoard(state, board, remainingTime) {
                state.board = board;
                state.remainingTime = remainingTime;
            },
            startGame(state, board, gameId, remainingTime, allocatedTime) {
                state.board = board;
                state.gameId = gameId;
                state.remainingTime = remainingTime;
                state.allocatedTime = allocatedTime;
            },
            endGame(state) {
                state.isEnd = true;
                state.isPaused = false;
                state.isRunning = false;
                state.remainingTime = 0;
            },
            pauseGame(state, remainingTime) {
                // state.isEnd = false;
                state.isPaused = true;
                state.isRunning = false;
                state.remainingTime = remainingTime;
            },
            resumeGame(state) {
                // state.isEnd = false;
                state.isPaused = false;
                state.isRunning = true;
            },
            setErrorMessage(state, message) {
                state.errorMessage = message;
            }
        },
        actions: {
            async saveBoard({
                commit
            }, {
                randomColorArrangement,
                gameId,
                userToken,
                score,
                timeLeft
            }) {
                try {
                    const response = await GameService.saveBoard(gameId, userToken, score, timeLeft);
                    if (response.ok) {
                        commit('saveBoard', {
                            randomColorArrangement,
                            timeLeft
                        });
                    } else {
                        throw new Error('Failed to save board');
                    }
                } catch (error) {
                    commit('setErrorMessage', error.message || 'Unknown error occurred');
                }
            },
            async endGame({
                commit
            }, {
                gameId,
                userToken
            }) {
                try {
                    const response = await GameService.endGame(gameId, userToken);
                    if (response.ok) {
                        commit('endGame');
                    } else {
                        throw new Error('Failed to end game');
                    }
                } catch (error) {
                    commit('setErrorMessage', error.message || 'Unknown error occured');
                }
            },
            async startNewGame({
                commit
            }, board, token, timeAllocated) {
                try {
                    const gameDetails = await GameService.startNewGame(token);
                    commit('startGame', {
                        board: board,
                        gameId: gameDetails.id,
                        remainingTime: timeAllocated,
                        allocatedTime: timeAllocated,
                    });
                } catch (error) {
                    commit('setErrorMessage', error.message || 'Unknown error occurred');
                }
            },
            getters: {
                isRunning: state => state.isRunning,
                isPaused: state => state.isPaused,
                isEnd: state => state.isEnd,
                getBoard: state => state.board,
                getAllocatedTime: state => state.allocatedTime,
                getRemainingTime: state => state.remainingTime,
                getGameId: state => state.gameId,
            }
        }
    }
}