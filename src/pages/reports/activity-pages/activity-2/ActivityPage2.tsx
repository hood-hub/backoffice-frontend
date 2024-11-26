import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavbar } from "../../../../hooks/useNavbar";
import Cards from "../../../../components/stat-cards/Cards";
import styles from "./ActivityPage.module.css";
import totalAreaIcon from "../../../../assets/svg/cards-svg/location/Frame 115 (3).svg";
import userIcon from "../../../../assets/svg/cards-svg/location/Frame 115 (5).svg";
import growthIcon from "../../../../assets/svg/cards-svg/location/Frame 115 (6).svg";
import arrowBack from "../../../../assets/svg/button-icon/ic_round-arrow-back.svg";
import UserListTable from "../../../../components/tables/user-list-table/UserListTable";
import apiClient from "../../../../utils/apiClient";
import loadingIcon from "../../../../assets/svg/table-icons/Dual Ball@1x-1.0s-200px-200px.svg";

interface ApiUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  createdAt: string;
  stringAddress?: string;
  isVerified: boolean;
  profilePicture?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  joined: string;
  location: string;
  status: "Active" | "Pending";
  avatar: string;
}

const ActivityPage: React.FC = () => {
  const { setTitle } = useNavbar();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [tempLoading, setTempLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle("All User’s Report");

    const fetchUsers = async (page: number) => {
      if (!loading) setTempLoading(true);

      try {
        const response = await apiClient.get(`/user/get-all?page=${page}`);
        const { data } = response.data;

        // Map the API response to the `User` interface
        const formattedUsers: User[] = data.users.map((user: ApiUser) => ({
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          username: user.username || "N/A",
          joined: new Date(user.createdAt).toLocaleString(),
          location: user.stringAddress || "Unknown",
          status: user.isVerified ? "Active" : "Pending",
          avatar: user.profilePicture || "/default-avatar.png",
        }));

        setUsers(formattedUsers);
        setTotalUsers(data.count);
        setTotalPages(data.totalPages);
        setLoading(false);
        setTempLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
        setLoading(false);
        setTempLoading(false);
      }
    };

    fetchUsers(currentPage);
  }, [setTitle, currentPage]);

  const handleBackClick = () => navigate(-1);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className={styles.anime}>
        <img src={loadingIcon} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div>
      <div className={styles.section_header}>
        <div className={styles.arrowBackicon} onClick={handleBackClick}>
          <img src={arrowBack} alt="Go Back" />
        </div>
        <h2>Overview</h2>
        <div className={styles.overview_cards}>
          <Cards
            icon={totalAreaIcon}
            title="Total Users"
            figure={totalUsers.toString()}
          />
          <Cards
            icon={userIcon}
            title="User Density"
            figure={totalUsers.toString()}
          />
          <Cards icon={growthIcon} title="Growth Areas" figure="0" />
        </div>
        <div className={styles.table_section}>
          <UserListTable
            users={users}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            tempLoading={tempLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
