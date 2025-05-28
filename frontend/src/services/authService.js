import api from '../api/axiosInstance';

export const authService = {
  async signup(email, password, role, department) {
    try {
      const response = await api.post('/auth/signup', { email, password, role, department });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Signup failed';
      throw new Error(message);
    }
  },

  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, role: userRole, department: userDepartment } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
      if (userDepartment) {
        localStorage.setItem('department', userDepartment);
      }

      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed';
      throw new Error(message);
    }
  },

  async getAllUsers() {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.get('/auth/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('getAllUsers error:', error.response || error);
      const message = error.response?.data?.error || error.message || 'Failed to fetch users';
      throw new Error(message);
    }
  },

  async verifyUser(userId) {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Sending verify request for user:', userId);
      const response = await api.post(`/auth/verify-user/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Verify response:', response.data);
      return response.data;
    } catch (error) {
      console.error('verifyUser error:', error.response || error);
      const message = error.response?.data?.error || error.message || 'Failed to verify user';
      throw new Error(message);
    }
  },

  async removeUser(userId) {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Sending remove request for user:', userId);
      const response = await api.delete(`/auth/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Remove response:', response.data);
      return response.data;
    } catch (error) {
      console.error('removeUser error:', error.response || error);
      const message = error.response?.data?.error || error.message || 'Failed to remove user';
      throw new Error(message);
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('department');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getRole() {
    return localStorage.getItem('role');
  },

  getDepartment() {
    return localStorage.getItem('department');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  async createUser(userData) {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Creating new user:', userData);
      const response = await api.post('/auth/users', userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Create user response:', response.data);
      return response.data;
    } catch (error) {
      console.error('createUser error:', error.response || error);
      const message = error.response?.data?.error || error.message || 'Failed to create user';
      throw new Error(message);
    }
  },
};
