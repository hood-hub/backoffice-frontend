import { useEffect } from "react";
import { useNavbar } from "../../hooks/useNavbar";
import styles from './FlaggedPost.module.css'
import Cards from "../../components/stat-cards/Cards";
import flaggedIcon from '../../assets/svg/cards-svg/Frame 115 (1).svg'
import PendingIcon from '../../assets/svg/cards-svg/Frame 117.svg'
import ResolvedIcon from '../../assets/svg/cards-svg/Frame 117 (1).svg'
import FlaggedTable from "../../components/tables/flagged-table/FlaggedTable";



const FlaggedPost = () => {

  const { setTitle } = useNavbar();

  useEffect(() => {
    setTitle("Flagged Post");
  }, [setTitle]);
  return (
    <section className={styles.flagedPost_section}>
      <div className={styles.section_header}>
        <h2>Overview</h2>
        {/* cards section */}
        <div className={styles.overview_cards}>
          <Cards icon={flaggedIcon} title="Total Flagged Posts" figure="0"/>
          <Cards icon={PendingIcon} title="Pending Review" figure="0"/>
          <Cards icon={ResolvedIcon} title="Resolved" figure="0"/>
        </div>
        <div className={styles.flaggedtable}>
          <FlaggedTable/>
        </div>
        
        </div>
    </section>
  )
}

export default FlaggedPost
