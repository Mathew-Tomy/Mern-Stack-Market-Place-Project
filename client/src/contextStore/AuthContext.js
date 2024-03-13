// AuthContext.js for login

import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const ContextAuth = ({ children }) => {
  // Your authentication logic here
  const [loggedIn, setLoggedIn] = useState(false);

  // Return the provider with value prop
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextAuth;
