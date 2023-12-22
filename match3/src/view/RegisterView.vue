<template>
    <div>
      <input v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="handleRegister">Register</button>
    </div>
  </template>
  
  <script setup>
  import RegisterViewModel from '../viewModel/RegisterViewModel';
  const { username, password, user, handleRegister } = RegisterViewModel();
  </script>
  