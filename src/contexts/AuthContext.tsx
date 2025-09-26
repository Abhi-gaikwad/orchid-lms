import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, userData?: User) => Promise<boolean>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        // Check if user is stored in memory (in a real app, you'd check tokens, etc.)
        const storedUser = sessionStorage.getItem('Orchid_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        sessionStorage.removeItem('Orchid_user');
      } finally {
        setLoading(false);
      }
    };

    // Simulate initial auth check delay
    setTimeout(checkAuthStatus, 500);
  }, []);

  const login = async (email: string, password: string, userData?: User): Promise<boolean> => {
    try {
      setLoading(true);

      // In a real app, you'd make an API call here
      // For demo, we'll use the provided user data or create a default user
      const user: User = userData || {
        id: '1',
        name: email.split('@')[0], // Use email prefix as name
        email: email,
        avatar: '/api/placeholder/100/100'
      };

      // Store user data in sessionStorage (in a real app, you'd handle tokens)
      sessionStorage.setItem('Orchid_user', JSON.stringify(user));
      
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('Orchid_user');
    
    // In a real app, you might want to redirect to home page
    // or clear other stored data
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;