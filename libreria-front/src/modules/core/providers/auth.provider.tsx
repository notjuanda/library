import React, { useState, useEffect, type ReactNode } from 'react';
import type { IUser } from '../types/auth.types';
import { AuthContext } from '../context/auth.context';
import instance from '../api/instance.api';
import axios from 'axios';

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null | false>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const { data } = await instance.get<IUser>('/usuarios/me/');
      setUser(data);
    } catch (error) {
      setUser(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (username: string, password: string): Promise<IUser> => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/auth/login', { username, password }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { data } = await instance.get<IUser>('/usuarios/me/');
      setUser(data);
      return data;
    } catch (error) {
      setUser(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(false);
  };

  const refreshToken = async () => {
    try {
      await instance.post('/auth/refresh');
      await loadUser();
    } catch (error) {
      setUser(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
