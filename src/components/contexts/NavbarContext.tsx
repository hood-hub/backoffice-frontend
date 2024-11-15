import React, { createContext, useState, ReactNode } from 'react';

interface NavbarContextProps {
  title: string;
  setTitle: (title: string) => void;
}

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

export const NavbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState("Dashboard Overview");

  return (
    <NavbarContext.Provider value={{ title, setTitle }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext;
