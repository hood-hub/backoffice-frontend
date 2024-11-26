import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { useNavbar } from '../../../../hooks/useNavbar';
import Cards from '../../../../components/stat-cards/Cards';
import styles from './ActivityPage1.module.css';
import totalareaIcon from '../../../../assets/svg/cards-svg/location/Frame 115 (3).svg';
import userIcon from '../../../../assets/svg/cards-svg/location/Frame 115 (5).svg';
import LocationTable from '../../../../components/tables/location-table/LocationTable';
import aarrowBack from '../../../../assets/svg/button-icon/ic_round-arrow-back.svg';

const ActivityPage1: React.FC = () => {
  
  const { setTitle } = useNavbar();
  const navigate = useNavigate(); 

  useEffect(() => {
    setTitle("Users by location");
  }, [setTitle]);

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div>
      <div className={styles.section_header}>
        <div className={styles.arrowBackicon} onClick={handleBackClick}>
          <img src={aarrowBack} alt="Go Back" />
        </div>
        <h2>Overview</h2>
        {/* Cards section */}
        <div className={styles.overview_cards}>
          <Cards icon={totalareaIcon} title="Total Areas" figure="0" />
          <Cards icon={userIcon} title="User Density" figure="0" />
        </div>
        <div className={styles.table_section}>
          <LocationTable />
        </div>
      </div>
    </div>
  );
};

export default ActivityPage1;
