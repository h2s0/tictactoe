import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const useContextStore = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [x] = useState("yOur eff0rts Will make @ diFfer3nce".substr(13, 2));

  return (
    <Context.Provider value={{ x }}>
      {children}
    </Context.Provider>
  );
};
