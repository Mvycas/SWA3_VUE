<template>
    <div class="game-container">
      <!-- <button v-if="isGameRunning" @click="pauseGame">Pause</button>
      <button v-if="isGameRunning" @click="resumeGame">Resume</button> -->
      <button v-if="isLoggedIn" @click="handleLogout()">Log out</button>
     
      <!-- <div v-if="!isGameRunning"> -->
        <!-- Menu and Game Creation -->
        <button v-if="isLoggedIn" @click="createNewGame()">Create New Game</button>
        <p v-else>You need to log in to start a new game.</p>
      <!-- </div> -->
      <div v-if="isGameRunning && isLoggedIn" class="game-board">
        <div v-for="(row, rowIndex) in board.tiles" :key="rowIndex">
          <img v-for="(candyColor, colIndex) in row" :key="colIndex"
               :src="candyColor" :alt="`Tile ${rowIndex}-${colIndex}`"
               :style="{
                backgroundColor: candyColor,
                border: isTileSelected(rowIndex, colIndex) ? '5px solid gold' : '5px solid transparent',
                borderRadius: '35px',
              }"
               @click="handleTileClick(rowIndex, colIndex)" />
      </div>
      </div>
      <div v-if="isGameRunning && isLoggedIn">
        <h1>{{ score }}</h1>
      </div>
    </div>
  </template>
  
  <script setup>
  import GameViewModel from '../viewModel/GameViewModel';
  
  const {
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
  } = GameViewModel();

  </script>
  
  <style scoped>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    .game {
      width: 560px;
      height: 560px;
      display: flex;
      flex-wrap: wrap;
    }

    .game img {
      width: 70px;
      height: 70px;
    }
    
  </style>
  