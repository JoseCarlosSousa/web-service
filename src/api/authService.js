  const API_URL = "https://user-service-production-3149.up.railway.app";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return response;
};
