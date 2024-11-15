import styles from './RecentActivities.module.css'
import noactivityIcon from '../../../assets/svg/home-icon/mdi_recent.svg'
import { activities } from '../../../constants/activities'
import ActivityCard from './recent_activities-cards/ActivityCard'
import faArrowRightPath from '../../../assets/svg/cards-svg/tabler_chevron-right.svg'

const RecentActivities = () => {
  return (
    <section className={styles.RecentActivities_section}>
        <div className={styles.section_header}>
            <h2>Recent Activity</h2>
            <p>See all</p>
        </div>
        <div className={styles.noActivity}>
            <img src={noactivityIcon} alt="" />
            <p>No Recent Activities</p>
        </div>
        <div className={styles.activitiesCards}>
            <div className={styles.section_header}>
                <h2>Quick Report</h2>
                <p>See all</p>
            </div>
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
        </div>
    </section>
  )
}

export default RecentActivities
