// Pointing to your local API Gateway routing engine
const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
  // Forwards traffic dynamically through the gateway instance
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const registerUser = async (firstName, lastName, email, password) => {
  // Forwards traffic dynamically through the gateway instance
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  return response;
};
