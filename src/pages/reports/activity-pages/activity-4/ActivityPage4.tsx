import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavbar } from "../../../../hooks/useNavbar";
import styles from "./ActivityPage4.module.css";
import Cards from "../../../../components/stat-cards/Cards";
import totalareaIcon from "../../../../assets/svg/cards-svg/location/Frame 115 (3).svg";
import growthIcon from "../../../../assets/svg/cards-svg/location/Frame 115 (6).svg";
import aarrowBack from "../../../../assets/svg/button-icon/ic_round-arrow-back.svg";
import ReportListTable from "../../../../components/tables/report-list-table/ReportListTable";
import apiClient from "../../../../utils/apiClient";

// Define the Report type
interface Report {
  id: string;
  username: string;
  dateFlagged: string; // Formatted date string
  reason: string;
  status: "Resolved" | "Open";
}

const ActivityPage4 = () => {
  const { setTitle } = useNavbar();
  const navigate = useNavigate();
  const [totalFlags, setTotalFlags] = useState<number>(0);
  const [pendingReviews, setPendingReviews] = useState<number>(0);
  const [reports, setReports] = useState<Report[]>([]); // Use the defined Report type

  useEffect(() => {
    setTitle("Flagged Post Report");

    const fetchFlaggedPosts = async () => {
      try {
        const response = await apiClient.get("/post/get-flagged");
        const { count, pendingCount, posts } = response.data.data;

        setTotalFlags(count);
        setPendingReviews(pendingCount);
        setReports(
          posts.map((post: any) => ({
            id: post._id,
            username: `${post.userId.firstName} ${post.userId.lastName}`,
            dateFlagged: new Date(post.flaggedAt).toLocaleDateString(),
            reason: post.flagReason,
            status: post.isFlaggedResolved ? "Resolved" : "Open",
          }))
        );
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

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.section_header}>
      <div className={styles.arrowBackicon} onClick={handleBackClick}>
        <img src={aarrowBack} alt="Go Back" />
      </div>
      <h2>Overview</h2>
      <div className={styles.overview_cards}>
        <Cards icon={totalareaIcon} title="Total Flags" figure={totalFlags.toString()} />
        <Cards icon={growthIcon} title="Pending Reviews" figure={pendingReviews.toString()} />
      </div>
      <div className={styles.reportTabel}>
        <ReportListTable reports={reports} />
      </div>
    </div>
  );
};

export default ActivityPage4;
