// Pointing to your local API Gateway routing engine
const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
  // Forwards traffic dynamically through the gateway instance
  // We return the raw fetch promise directly so the component can safely consume the body stream once
  return await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
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

/**
 * 🌟 Helper function to perform authenticated GET requests
 * Automatically attaches the Bearer JWT token from localStorage
 */
export const fetchAuthenticatedGet = async (endpoint) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Attaches the token only if it exists in localStorage
      ...(token && { "Authorization": `Bearer ${token}` }),
    },
  });

  return response;
};
