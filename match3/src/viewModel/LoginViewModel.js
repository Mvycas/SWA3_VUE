import { ref } from 'vue';
import { login } from '../service/AuthService';
import UserModel from '../model/UserModel';

export default function LoginViewModel() {
  const username = ref('');
  const password = ref('');
  const user = ref(new UserModel());

  const handleLogin = async () => {
    try {
      const userData = await login(username.value, password.value);
      user.value = new UserModel(userData.token, userData.userId);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return { username, password, user, handleLogin };
}