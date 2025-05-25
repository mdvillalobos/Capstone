import { createContext, useContext, useState, useCallback } from 'react';

export const LoadingContext = createContext({});

export const LoadingContextProvider = ({ children }) => {
  const [ isPageLoading, setIsPageLoading ] = useState(false);

  return (
    <LoadingContext.Provider value={{ isPageLoading, setIsPageLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
