import api from '../api/axiosInstance';

export const authService = {
  async signup(email, password, role) {
    try {
      const response = await api.post('/auth/signup', { email, password, role });
      const { token, role: userRole } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);

      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Signup failed';
      throw new Error(message);
    }
  },

  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, role: userRole } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);

      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed';
      throw new Error(message);
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getRole() {
    return localStorage.getItem('role');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};
