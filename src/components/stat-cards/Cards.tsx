import React from 'react';
import styles from './Cards.module.css';

interface CardProps {
  icon: string;      // Path to the icon image
  title: string;     // Title text for the card
  figure: string;    // Figure or value to display
}

const Cards: React.FC<CardProps> = ({ icon, title, figure }) => {
  return (
    <div className={styles.card}>
      <img src={icon} alt={`${title} icon`} className={styles.icon} />
      
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.figure}>{figure}</p>
      
    </div>
  );
};

export default Cards;
