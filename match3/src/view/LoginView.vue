<template>
    <div>
      <input v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="handleLogin">Login</button>
    </div>
  </template>
  
  <script setup>
  import LoginViewModel from '../viewModel/LoginViewModel';
  const { username, password, user, handleLogin } = LoginViewModel();
  </script>
  