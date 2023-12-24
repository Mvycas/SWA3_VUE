<template>
    <div>
      <p>User Name: {{ userName }}</p>
      <p>User ID: {{ userId }}</p>
      <p>User ID: {{ tokken }}</p>
      <p>Error: {{ errorMessage }}</p>
      <input v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="handleLogin">Login</button>
      <button @click="handleLogout">logout</button>
    </div>
  </template>
  
  <script setup>
  import LoginViewModel from '../viewModel/LoginViewModel';
  const { username, password, handleLogin, handleLogout, errorMessage, userName, tokken, userId } = LoginViewModel();
  </script>
  