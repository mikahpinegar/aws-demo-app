export const createResponse = (statusCode, body) => ({
  statusCode,
  body: JSON.stringify(body),
});

async function apiRequest(endpoint, method = 'GET', data = null) {
  const url = `https://api.mikahpinegar.com${endpoint}`;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Add other headers if needed
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function getUsers() {
  return apiRequest('/users');
}

export async function getUser(userId) {
  return apiRequest(`/users/${userId}`);
}

export async function createUser(userData) {
  return apiRequest('/users', 'POST', userData);
}

export async function updateUser(userId, userData) {
  return apiRequest(`/users/${userId}`, 'PUT', userData);
}

export async function deleteUser(userId) {
  return apiRequest(`/users/${userId}`, 'DELETE');
}
