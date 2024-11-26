import { useEffect, useState } from "react";
import Cards from "../../components/stat-cards/Cards";
import styles from "./Home.module.css";
import totalIcon from "../../assets/svg/cards-svg/Frame 115.svg";
import flaggedIcon from "../../assets/svg/cards-svg/Frame 115 (1).svg";
import RecentActivities from "./recent-activities/RecentActivities";
import { useNavbar } from "../../hooks/useNavbar";
import apiClient from "../../utils/apiClient";

const Home = () => {
  const { setTitle } = useNavbar();

  // State variables for total users and flagged posts
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [flaggedPosts, setFlaggedPosts] = useState<number>(0);

  useEffect(() => {
    setTitle("Dashboard Overview");

    // Fetch total users
    const fetchTotalUsers = async () => {
      try {
        const response = await apiClient.get("/user/get-all?page=1");
        const { count } = response.data.data;
        setTotalUsers(count);
        console.log("Total Users:", count);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching total users:", error.message);
        } else {
          console.error("An unknown error occurred while fetching total users.");
        }
      }
    };

    // Fetch flagged posts
    const fetchFlaggedPosts = async () => {
      try {
        const response = await apiClient.get("/post/get-flagged");
        const { count } = response.data.data;
        setFlaggedPosts(count);
        console.log("Flagged Posts:", count);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching flagged posts:", error.message);
        } else {
          console.error("An unknown error occurred while fetching flagged posts.");
        }
      }
    };

    fetchTotalUsers();
    fetchFlaggedPosts();
  }, [setTitle]);

  return (
    <div className={styles.home_section}>
      <div className={styles.section_header}>
        <h2>Overview</h2>
        {/* Cards Section */}
        <div className={styles.overview_cards}>
          <Cards icon={totalIcon} title="Total Users" figure={totalUsers.toString()} />
          <Cards icon={flaggedIcon} title="Flagged Posts" figure={flaggedPosts.toString()} />
        </div>
        <RecentActivities />
      </div>
    </div>
  );
};

export default Home;
