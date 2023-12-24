<template>
    <div>
      <p>User Name: {{ userName }}</p>
      <p>User ID: {{ userId }}</p>
      <p>User ID: {{ tokken }}</p>
      <p v-if="errorMessage">Error: {{ errorMessage }}</p>
      <input v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="handleLogin">Login</button>
    </div>
  </template>
  
  <script setup>
  import LoginViewModel from '../viewModel/LoginViewModel';

  import { computed } from 'vue';
  import { useStore } from 'vuex';


  const { username, password, user, handleLogin } = LoginViewModel();

  const store = useStore();
  const userName = computed(() => store.getters['login/userName']);
  const tokken = computed(() => store.getters['login/token']);
  const userId = computed(() => store.getters['login/userId']);

  </script>
  