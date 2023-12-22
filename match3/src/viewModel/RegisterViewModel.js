import { ref } from 'vue';
import { register } from '../service/AuthService';
import UserModel from '../model/UserModel';

export default function RegisterViewModel() {
  const username = ref('');
  const password = ref('');
  const user = ref(new UserModel());

  const handleRegister = async () => {
    try {
      const userData = await register(username.value, password.value);
      user.value = new UserModel(userData.token, userData.userId);
    } catch (error) {
      console.error('Register failed:', error.message);
    }
  };

  return { username, password, user, handleRegister };
}
