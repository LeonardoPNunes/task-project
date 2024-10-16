import React, { createContext, useState } from 'react';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <UserContext.Provider value={{data, setData}}>
      {children}
    </UserContext.Provider>
  );
};
