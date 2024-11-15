import { useContext } from 'react';
import NavbarContext from '../components/contexts/NavbarContext';


export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};
