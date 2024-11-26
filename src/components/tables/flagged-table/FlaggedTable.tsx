import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FlaggedTable.module.css";
import deleteIcon from "../../../assets/svg/button-icon/fluent_delete-20-regular.svg";
import cancelIcon from "../../../assets/svg/button-icon/hugeicons_cancel-01.svg";
import arrowLeft from "../../../assets/svg/table-icons/arrow-left.svg";
import arrowRight from "../../../assets/svg/table-icons/arrow-right.svg";
import apiClient from "../../../utils/apiClient";
import loadingIcon from "../../../assets/svg/table-icons/Dual Ball@1x-1.0s-200px-200px.svg";

interface User {
  firstName: string;
  lastName: string;
  username: string;
}

interface Post {
  _id: string;
  text: string;
  flagReason: string;
  flaggedAt: string;
  userId: User;
  isFlaggedResolved: boolean;
}

const FlaggedTable: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch flagged posts
  useEffect(() => {
    const fetchFlaggedPosts = async () => {
      try {
        const response = await apiClient.get("/post/get-flagged");
        const fetchedPosts: Post[] = response.data.data.posts;
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load flagged posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlaggedPosts();
  }, []);

  // Navigate to flag details page with full post object (if needed)
  const handleRowClick = (post: Post) => {
    navigate(`/flag-details/${post._id}`, { state: { post } });
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
    <div className={styles.tableContainer}>
      <div className={styles.actions}>
        <h2>Recent Flags</h2>
        <div className={styles.header_buttton}>
          <button className={styles.deleteButton}>
            <img src={deleteIcon} alt="Delete" />
            Delete
          </button>
          <button className={styles.removeButton}>
            <img src={cancelIcon} alt="Remove Flags" />
            Remove Flags
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Post Text</th>
            <th>Username</th>
            <th>Date Flagged</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post._id}
              onClick={() => handleRowClick(post)}
              className={styles.clickableRow}
            >
              <td>
                <input type="checkbox" />
              </td>
              <td className={styles.title}>{post.text}</td>
              <td className={styles.username}>{`${post.userId.firstName} ${post.userId.lastName}`}</td>
              <td className={styles.flagdate}>
                {new Date(post.flaggedAt).toLocaleString()}
              </td>
              <td className={styles.flagreason}>
                <span className={styles.reason}>{post.flagReason}</span>
              </td>
              <td>
                <span
                  className={`${styles.status} ${
                    styles[post.isFlaggedResolved ? "solved" : "pending"]
                  }`}
                >
                  {post.isFlaggedResolved ? "Resolved" : "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button className={styles.pageButtonPrev}>
          <img src={arrowLeft} alt="Previous" />
          Previous
        </button>
        <div className={styles.pageNumbers}>
          <span className={styles.pageNumber}>1</span>
          <span className={styles.pageNumber}>2</span>
          <span className={styles.pageNumber}>10</span>
        </div>
        <button className={styles.pageButton}>
          Next
          <img src={arrowRight} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default FlaggedTable;
