import 
{saveBoard, startNewGame}
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
        tiles: [],
        board: {
            w: 0,
            h: 0,
            tiles: [],
            score: 0
        },
    },
        mutations: {
            // saveBoard(state, board, remainingTime) {
            //     state.board = board;
            //     state.remainingTime = remainingTime;
            // },
            // startGame(state, board, gameId, remainingTime, allocatedTime) {
            //     state.board = board;
            //     state.gameId = gameId;
            //     state.remainingTime = remainingTime;
            //     state.allocatedTime = allocatedTime;
            // },
            // endGame(state) {
            //     state.isEnd = true;
            //     state.isPaused = false;
            //     state.isRunning = false;
            //     state.remainingTime = 0;
            // },
            // pauseGame(state, remainingTime) {
            //     // state.isEnd = false;
            //     state.isPaused = true;
            //     state.isRunning = false;
            //     state.remainingTime = remainingTime;
            // },
            // resumeGame(state) {
            //     // state.isEnd = false;
            //     state.isPaused = false;
            //     state.isRunning = true;
            // },
            // setIsRunningTrue(state) {
            //     state.isRunning = true;
            // },
            // setErrorMessage(state, message) {
            //     state.errorMessage = message;
            // }
            setIsRunning(state, isRunning) {
                state.isRunning = isRunning;
            },
            setIsEnd(state, isEnd) {
                state.isEnd = isEnd;
            },
            setIsPaused(state, isPaused) {
                state.isPaused = isPaused;
            },
            setErrorMessage(state, message) {
                state.errorMessage = message;
            },
            setGameId(state, gameId) {
                state.gameId = gameId;
            },
            setAllocatedTime(state, allocatedTime) {
                state.allocatedTime = allocatedTime;
            },
            setRemainingTime(state, remainingTime) {
                state.remainingTime = remainingTime;
            },
            setBoard(state, board) {
                state.board = board;
            },
            setTiles(state, tiles) {
                state.tiles = tiles;
            },
        },
        actions: {
            saveBoard({commit}, {board, gameId, userToken, score, remainingTime}) {
                    const response = saveBoard(gameId, userToken, score, remainingTime);
                    console.log("Response from server:", response);

               
                        console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeehehehehheheehehehehehehe1")
                        commit('setBoard', board);
                        commit('setScore', score);
                        commit('setRemainingTime', remainingTime)
               
            },
            // async endGame({ commit }, { gameId, userToken }) {
            //     try {
            //         const response = await endGame(gameId, userToken);
            //         if (response.ok) {
            //             commit('endGame');
            //         } else {
            //             throw new Error('Failed to end game');
            //         }
            //     } catch (error) {
            //         commit('setErrorMessage', error.message || 'Unknown error occured');
            //     }
            // },
            async startNewGame({commit}, {board, token, timeAllocated}) {
                try {
                    const gameDetails = await startNewGame(token);
                    commit('setBoard', board);
                    commit('setGameId', gameDetails.id);
                    commit('setRemainingTime', timeAllocated);
                    commit('setAllocatedTime', timeAllocated);
                    commit('setTiles', board.tiles);
                    commit('setIsRunning', true);
                } catch (error) {
                    commit('setErrorMessage', error.message || 'Unknown error occurred');
                }
            }
            },
            getters: {
                isRunning: state => state.isRunning,
                isPaused: state => state.isPaused,
                isEnd: state => state.isEnd,
                getBoard: (state) => state.board,
                getTiles: (state) => state.tiles,
                getAllocatedTime: state => state.allocatedTime,
                getRemainingTime: state => state.remainingTime,
                getGameId: state => state.gameId,
            }
        };
    




