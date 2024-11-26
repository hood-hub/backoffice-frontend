import { useEffect, useState } from "react";
import { useNavbar } from "../../hooks/useNavbar";
import styles from './FlaggedPost.module.css';
import Cards from "../../components/stat-cards/Cards";
import flaggedIcon from '../../assets/svg/cards-svg/Frame 115 (1).svg';
import PendingIcon from '../../assets/svg/cards-svg/Frame 117.svg';
import ResolvedIcon from '../../assets/svg/cards-svg/Frame 117 (1).svg';
import FlaggedTable from "../../components/tables/flagged-table/FlaggedTable";
import apiClient from "../../utils/apiClient";

const FlaggedPost = () => {
  const { setTitle } = useNavbar();
  const [flaggedPosts, setFlaggedPosts] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [resolvedCount, setResolvedCount] = useState<number>(0);

  useEffect(() => {
    setTitle("Flagged Post");

    const fetchFlaggedPosts = async () => {
      try {
        const response = await apiClient.get("/post/get-flagged");
        const { count, pendingCount, resolvedCount } = response.data.data;
        setFlaggedPosts(count);
        setPendingCount(pendingCount);
        setResolvedCount(resolvedCount);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching flagged posts:", error.message);
        } else {
          console.error("An unexpected error occurred.");
        }
      }
    };

    fetchFlaggedPosts();
  }, [setTitle]);

  return (
    <section className={styles.flagedPost_section}>
      <div className={styles.section_header}>
        <h2>Overview</h2>
        {/* Cards section */}
        <div className={styles.overview_cards}>
          <Cards icon={flaggedIcon} title="Total Flagged Posts" figure={flaggedPosts.toString()} />
          <Cards icon={PendingIcon} title="Pending Review" figure={pendingCount.toString()} />
          <Cards icon={ResolvedIcon} title="Resolved" figure={resolvedCount.toString()} />
        </div>
        <div className={styles.flaggedtable}>
          <FlaggedTable />
        </div>
      </div>
    </section>
  );
};

export default FlaggedPost;
