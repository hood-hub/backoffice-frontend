import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './FlagDetailsPage.module.css'
import aarrowBack from '../../../assets/svg/button-icon/ic_round-arrow-back.svg'
import profilepics from '../../../assets/images/profilpics.jpg'
import linkIcon from '../../../assets/svg/profile-icon/Vector (4).svg'





const FlagDetailsPage: React.FC = () => {
  const { title } = useParams<{ title: string }>();

  return (
    <div className={styles.flagdetail_container}>
        <div className={styles.arrowBackicon}>
         <img src={aarrowBack} alt="" />
        </div>
        <div className={styles.header}>
            <h1>Flagged Post Details</h1>
            <p>ID: FLG-2024-11-001</p>
        </div>
        <div className={styles.post_details}>
            <div className={styles.post_state}>
                <div className={styles.upperSection}>
                    <div className={styles.profile_header}>
                        <img src={profilepics} alt="" />
                        <div className={styles.profileName}>
                            <h2>David Hancoc</h2>
                            <p>Posted in [Group name]</p>
                        </div>
                    </div>
                </div>
                <div className={styles.dateTime}>
                            <p>2024-11-10</p>
                            <p>14:32 UTC</p>
                </div>
                <div className={styles.user_details}>
                <img src={linkIcon} alt="" />
                    <p>/groups/[Group Title]/posts/123456</p>
                </div>
                <div className={styles.warning}>
                This is the flagged content that requires moderation. 
                It may contain multiple lines of text and <br />
                potentially problematic material that needs review.
                </div>
            </div>
            
        </div>
        
     
      
    </div>
  );
};

export default FlagDetailsPage;
