import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/svg/button-icon/Frame 9.svg'; 
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackClick }) => {
  const navigate = useNavigate();

  // Default function to go to the previous page
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1); // Use navigate hook to go back
    }
  };

  return (
    <header className={styles.header}>
      <img
        src={backIcon}
        alt="Back"
        className={styles.backIcon}
        onClick={handleBackClick}
      />
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default Header;
