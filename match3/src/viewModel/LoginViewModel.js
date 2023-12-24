// LoginViewModel.js
import { ref } from 'vue';
import { useStore } from 'vuex';

export default function LoginViewModel() {
  const store = useStore();
  
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');

  const handleLogin = async () => {
    try {
      await store.dispatch('login/handleLogin', { username: username.value, password: password.value });
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = error.message;
    }
  };

  return { username, password, handleLogin, errorMessage };
}
