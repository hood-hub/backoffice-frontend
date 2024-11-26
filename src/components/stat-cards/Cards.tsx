import React from 'react';
import styles from './Cards.module.css';

interface CardProps {
  icon: string;      
  title: string;     
  figure: string;    
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
