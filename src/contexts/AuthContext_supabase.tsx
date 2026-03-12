import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string, name: string, mobile: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      if (data.success) {
        const userData: User = {
          id: data.data._id,
          name: data.data.name,
          email: data.data.email,
          mobile: data.data.mobile,
          role: data.data.role,
        };
        setUser(userData);
        setIsAdmin(data.data.role === 'admin');
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, mobile: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, mobile }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message || 'Registration failed' } };
      }

      // Store token and set user
      localStorage.setItem('token', data.token);
      const userData: User = {
        id: data.data._id,
        name: data.data.name,
        email: data.data.email,
        mobile: data.data.mobile,
        role: data.data.role,
      };
      setUser(userData);
      setIsAdmin(data.data.role === 'admin');

      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message || 'Network error' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message || 'Login failed' } };
      }

      // Store token and set user
      localStorage.setItem('token', data.token);
      const userData: User = {
        id: data.data._id,
        name: data.data.name,
        email: data.data.email,
        mobile: data.data.mobile,
        role: data.data.role,
      };
      setUser(userData);
      setIsAdmin(data.data.role === 'admin');

      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message || 'Network error' } };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
