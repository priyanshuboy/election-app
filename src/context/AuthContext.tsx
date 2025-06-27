import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (aadhaarNumber: string, otp: string): Promise<boolean> => {
    // Mock authentication - in real app this would verify with government APIs
    if (otp === '123456') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      let user = users.find((u: User) => u.aadhaarNumber === aadhaarNumber);
      
      if (!user) {
        // Create new user if doesn't exist
        user = {
          id: Date.now().toString(),
          name: 'Priyanshu kushwah', // Would come from Aadhaar API
          aadhaarNumber,
          phoneNumber: '+91-6263123168',
          hasVoted: false
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      aadhaarNumber: userData.aadhaarNumber || '',
      phoneNumber: userData.phoneNumber || '',
      hasVoted: false
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};