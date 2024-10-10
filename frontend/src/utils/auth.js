import { jwtDecode } from 'jwt-decode'; // Named import

export const storeToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token); // Use jwtDecode instead of jwt_decode
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
