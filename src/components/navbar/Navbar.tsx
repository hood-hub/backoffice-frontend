import React, { useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import PrimarySearchInput from '../input/search-input/PrimarySearchInput';
import { useNavbar } from '../../hooks/useNavbar';


const Navbar: React.FC = () => {
  const { title } = useNavbar();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const isFlaggedPostPage = location.pathname === '/flagged-post';

  return (
    <header className={styles.navbar}>
      <h2 className={styles.title}>{title}</h2>

      {/* Conditionally render PrimarySearchInput with specific styles for the flagged post page */}
      {isFlaggedPostPage && (
        <div
          style={{
            marginLeft: 'auto',
            width: '540px',
            position: 'absolute',
            right: '101px',
            top: '50%', // Center vertically if needed
            transform: 'translateY(-50%)'
          }}
        >
          <PrimarySearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search posts ..."
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
