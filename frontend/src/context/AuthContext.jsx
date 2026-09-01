import { createContext, useState } from "react";

// eslint-disable-next-line
export const AuthContext = createContext({
  token: null,
  userId: null,
  isLoggedIn: false,
  // eslint-disable-next-line
  login: (token, userId) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));

  const loginHandler = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId);
  };

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isLoggedIn: !!token,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
