// import axios from 'axios';

// interface User {
//   username: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (username: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const API_BASE_URL = `http://localhost:3000/api`;

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     const username = localStorage.getItem('username');

//     if (isLoggedIn === 'true' && username) {
//       setUser({ username });
//     }
//     setLoading(false);
//   }, []);

//   const login = async (username: string, password: string): Promise<boolean> => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/auth/login`, {
//         username,
//         password,
//       });

//       if (response.data.success) {
//         const { user } = response.data;
//         localStorage.setItem('isLoggedIn', 'true');
//         localStorage.setItem('username', user.username);
//         setUser(user);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Login error:', error);
//       return false;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('username');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
// =======
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// interface User {
//   id?: string;
//   username: string;
//   role?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (username: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   loading: boolean;
//   getToken: () => string | null;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const API_BASE_URL = `http://localhost:3000/api`;

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     const username = localStorage.getItem('username');
//     const token = localStorage.getItem('token');

//     if (isLoggedIn === 'true' && username && token) {
//       setUser({ username });
//     }
//     setLoading(false);
//   }, []);

//   const login = async (username: string, password: string): Promise<boolean> => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/auth/login`, {
//         username,
//         password,
//       });

//       if (response.data.success) {
//         const { user, token } = response.data;
//         localStorage.setItem('isLoggedIn', 'true');
//         localStorage.setItem('username', user.username);
//         if (user.id) {
//           localStorage.setItem('adminId', user.id);
//         }
//         localStorage.setItem('token', token);
//         localStorage.setItem('userRole', user.role || 'admin'); // store role for redirection
//         setUser(user);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Login error:', error);
//       return false;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('username');
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   const getToken = () => {
//     return localStorage.getItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading, getToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id?: string;
  username: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = `http://localhost:3000/api`;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore user session on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (isLoggedIn === 'true' && token && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('Failed to parse stored user:', err);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });

      if (response.data.success) {
        const { user, token } = response.data;

        // Store everything needed
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userRole', user.role || 'admin');
        if (user.id) {
          localStorage.setItem('adminId', user.id);
        }

        setUser(user);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('adminId');
    setUser(null);
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
