import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavbar } from '../../../../hooks/useNavbar';
import Cards from '../../../../components/stat-cards/Cards';
import styles from './ActivityPage.module.css'
import totalareaIcon from '../../../../assets/svg/cards-svg/location/Frame 115 (3).svg'
import userIcon from '../../../../assets/svg/cards-svg/location/Frame 115 (5).svg'
import growthIcon from '../../../../assets/svg/cards-svg/location/Frame 115 (6).svg'
import LocationTable from '../../../../components/tables/location-table/LocationTable';

const ActivityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setTitle } = useNavbar();

  useEffect(() => {
    setTitle("Users by location");
  }, [setTitle]);

  return (
    <div>
       <div className={styles.section_header}>
            <h2>Overview</h2>
            {/* cards section */}
            <div className={styles.overview_cards}>
            <Cards icon={totalareaIcon} title="Total Areas" figure="0"/>
            <Cards icon={userIcon} title="User Density" figure="0"/>
            <Cards icon={growthIcon} title="Growth Areas" figure="0"/>
            </div>
            <div className={styles.table_section}>
                <LocationTable/>
            </div>
        </div>
    </div>
  );
};

export default ActivityPage;
