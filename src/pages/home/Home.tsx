import Cards from '../../components/stat-cards/Cards'
import styles from './Home.module.css'
import totalIcon from '../../assets/svg/cards-svg/Frame 115.svg'
import flaggedIcon from '../../assets/svg/cards-svg/Frame 115 (1).svg'
import pendingIcon from '../../assets/svg/cards-svg/Frame 115 (2).svg'
import RecentActivities from './recent-activities/RecentActivities'
import { useEffect } from 'react'
import { useNavbar } from '../../hooks/useNavbar'


const Home = () => {

  const { setTitle } = useNavbar();

  useEffect(() => {
    setTitle("Dashboard Overview");
  }, [setTitle]);
  return (
    <div className={styles.home_section}>
      <div className={styles.section_header}>
        <h2>Overview</h2>
        {/* cards section */}
        <div className={styles.overview_cards}>
          <Cards icon={totalIcon} title="Total Users" figure="0"/>
          <Cards icon={flaggedIcon} title="Flagged Posts" figure="0"/>
          <Cards icon={pendingIcon} title="Pending Reviews" figure="0"/>
        </div>
        <RecentActivities/>
        
      </div>
    </div>
  )
}

export default Home
