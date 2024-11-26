import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./FlagDetailsPage.module.css";
import aarrowBack from "../../../assets/svg/button-icon/ic_round-arrow-back.svg";
import removeIcon from "../../../assets/svg/moderation-svg/hugeicons_cancel-01 (1).svg";
import safeIcon from "../../../assets/svg/moderation-svg/iconamoon_check-duotone.svg";
import lodingIcon from "../../../assets/svg/table-icons/Dual Ball@1x-1.0s-200px-200px.svg";
import apiClient from "../../../utils/apiClient";

// Interface for user data
interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  profilePicture?: string;
  noOfFlags: number;
  createdAt: string;
}

// Interface for flagged post data
interface FlaggedPost {
  _id: string;
  text: string;
  flagReason: string;
  flaggedAt: string;
  userId: User;
  media: string[];
  isFlaggedResolved: boolean;
}

const FlagDetailsPage: React.FC = () => {
  const { title } = useParams<{ title: string }>(); // Use title from URL
  const navigate = useNavigate();
  const [postDetails, setPostDetails] = useState<FlaggedPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch post details on component mount
  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!title) {
        setError("No post ID provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.get(`/post/get-flagged`);
        const post = response.data.data.posts.find(
          (p: FlaggedPost) => p._id === title
        );

        if (post) {
          setPostDetails(post);
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("Failed to fetch post details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [title]);

  const handleRemoveContent = async () => {
    if (!postDetails) {
      alert("No post details available.");
      return;
    }

    setActionLoading(true);

    try {
      const response = await apiClient.put(
        `/post/remove-flagged/${postDetails._id}`
      );

      if (response.data.success) {
        alert("Content removed successfully!");
        navigate(-1); // Go back to the previous page
      } else {
        alert(response.data.message || "Failed to remove content.");
      }
    } catch (err) {
      console.error("Error removing content:", err);
      alert("An error occurred while removing the content.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkAsSafe = async () => {
    if (!postDetails) {
      alert("No post details available.");
      return;
    }

    setActionLoading(true);

    try {
      const response = await apiClient.put(
        `/post/resolve-flagged/${postDetails._id}`
      );

      if (response.data.success) {
        alert("Post marked as safe successfully!");

        // Update the local state to reflect the change
        setPostDetails({
          ...postDetails,
          isFlaggedResolved: true,
        });
        navigate(-1); // Go back to refresh table
      } else {
        alert(response.data.message || "Failed to mark the post as safe.");
      }
    } catch (err) {
      console.error("Error marking post as safe:", err);
      alert("An error occurred while marking the post as safe.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <img src={lodingIcon} alt="Loading..." />
      </div>
    );
  }

  if (error || !postDetails) {
    return <p>{error || "No details available."}</p>;
  }

  return (
    <div className={styles.flagdetail_container}>
      <div className={styles.arrowBackicon} onClick={() => navigate(-1)}>
        <img src={aarrowBack} alt="Go Back" />
      </div>
      <div className={styles.header}>
        <h1>Flagged Post Details</h1>
        <p>ID: {postDetails._id}</p>
      </div>
      <div className={styles.post_details}>
        <div className={styles.post_state}>
          <div className={styles.upperSection}>
            <div className={styles.profile_header}>
              <img
                src={postDetails.userId.profilePicture || "/default-profile.jpg"}
                alt="Profile"
              />
              <div className={styles.profileName}>
                <h2>{`${postDetails.userId.firstName} ${postDetails.userId.lastName}`}</h2>
                <p>Posted in [Group name]</p>
              </div>
            </div>
          </div>
          <div className={styles.dateTime}>
            <p>{new Date(postDetails.flaggedAt).toLocaleString()}</p>
          </div>
          <div className={styles.user_details}>
            <p>{postDetails.text}</p>
          </div>
          <div className={styles.warning}>
            <p>{postDetails.flagReason}</p>
          </div>
        </div>
        <div className={styles.userData}>
          <h3>User Information</h3>
          <div className={styles.userData_container}>
            <div className={styles.upper_details}>
              <div className={styles.name_date}>
                <p>Full name</p>
                <p>Date Joined</p>
              </div>
              <div className={styles.data}>
                <p>{`${postDetails.userId.firstName} ${postDetails.userId.lastName}`}</p>
                <p>{new Date(postDetails.userId.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className={styles.lowwer_detal}>
              <div className={styles.name_date}>
                <p>Email address</p>
                <p>Previous Flags</p>
              </div>
              <div className={styles.data}>
                <p>{postDetails.userId.email}</p>
                <p className={styles.flag_num}>{postDetails.userId.noOfFlags}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.moderation_action_header}>
          <h3>Moderation Actions</h3>
          <div className={styles.action_buttons}>
            <div
              className={`${styles.remove_action} ${
                actionLoading ? styles.disabled : ""
              }`}
              onClick={!actionLoading ? handleRemoveContent : undefined}
            >
              <img src={removeIcon} alt="Remove" />
              {actionLoading ? "Processing..." : "Remove content"}
            </div>
            <div
              className={`${styles.safe_action} ${
                actionLoading ? styles.disabled : ""
              }`}
              onClick={!actionLoading ? handleMarkAsSafe : undefined}
            >
              <img src={safeIcon} alt="Mark Safe" />
              {actionLoading ? "Processing..." : "Mark as safe"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlagDetailsPage;
