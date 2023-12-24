const baseUrl = "http://localhost:9090";
const headers = { "Content-Type": "application/json" };

async function login(username, password) {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return { token: data.token, userId: data.userId };
  } catch (error) {
    throw error;
  }
}

async function register(username, password) {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return { token: data.token, userId: data.userId };
  } catch (error) {
    throw error;
  }
}

async function logout(token) {
  try {
    const response = await fetch(`${baseUrl}/logout?token=${token}`, {
      method: "POST",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Logout failed! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    throw error;
  }
}

export { login, register, logout };
