// AuthContext.js

import React, { createContext, useState } from 'react';

export const AdminAuthContext = createContext();

export const AdminProvider = ({ children }) => {
  // Your authentication logic here
  const [loggedIn, setLoggedIn] = useState(false);

  // Return the provider with value prop
  return (
    <AdminAuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
