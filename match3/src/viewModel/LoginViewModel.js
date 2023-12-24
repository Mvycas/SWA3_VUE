// LoginViewModel.js
import { ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default function LoginViewModel() {
  const store = useStore();

  const errorMessage = computed(() => store.getters['login/errorMessage']);
  const userName = computed(() => store.getters['login/userName']);
  const tokken = computed(() => store.getters['login/token']);
  const userId = computed(() => store.getters['login/userId']);
  console.log(userName);
  const username = ref('');
  const password = ref('');

  const handleLogin = async () => {
      await store.dispatch('login/handleLogin', { username: username.value, password: password.value });
  };

  const handleLogout = async () => {
      await store.dispatch('login/handleLogout');
  };

  return { username, password, handleLogin, handleLogout, errorMessage, userName, tokken, userId };
}
