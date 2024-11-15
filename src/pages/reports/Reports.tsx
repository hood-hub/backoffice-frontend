import { useEffect } from "react";
import { useNavbar } from "../../hooks/useNavbar";
import styles from './Reports.module.css'
import ActivityCard from "../home/recent-activities/recent_activities-cards/ActivityCard";


import faArrowRightPath from '../../assets/svg/cards-svg/tabler_chevron-right.svg'
import { activities } from "../../constants/activities";

const Reports = () => {
  const { setTitle } = useNavbar();

  useEffect(() => {
    setTitle("Reports");
  }, [setTitle]);
  return (
    <div className={styles.activityCard}>
              {activities.map((activity, index) => (
                <ActivityCard
                  key={index}
                  title={activity.title}
                  subtitle={activity.subtitle}
                  icon={<img src={faArrowRightPath} alt="Chevron Right" />}
                  redirectTo={activity.redirectTo}
                />
              ))}
    </div>
  )
}

export default Reports
