
import { useNavigate } from 'react-router-dom';
import styles from'./ActivityCard.module.css';

interface ActivityCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  redirectTo: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, subtitle, icon, redirectTo }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(redirectTo);
  };

  return (
    <div className={styles.activity_card} onClick={handleCardClick}>
      <div className={styles.activity_card_content}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <div className={styles.activity_card_icon}>{icon}</div>
    </div>
  );
};

export default ActivityCard;
