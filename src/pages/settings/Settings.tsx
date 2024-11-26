import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavbar } from "../../hooks/useNavbar";
import styles from "./Settings.module.css";
import profileImg from "../../assets/images/profilpics.jpg";
import copyIcon from "../../assets/svg/profile-icon/solar_copy-linear.svg";
import Input from "../../components/input/Input";
import PrimaryButton from "../../components/buttons/primary-button/PrimaryButton";
import ChangePasswordModal from "../../modals/change-password-modal/ChangePasswordModal";
import apiClient from "../../utils/apiClient";

interface GeoAddress {
  type: string;
  coordinates: [number, number];
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  profilePicture?: string;
  isAdmin: boolean;
  stringAddress?: string;
  geoAddress?: GeoAddress;
}

const Settings = () => {
  const { setTitle } = useNavbar();

  // Fetch userId from Redux or fallback to localStorage
  const authUser = useSelector((state: RootState) => state.auth.user);
  const userId = authUser?._id || localStorage.getItem("userId");

  // State variables
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("User");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(profileImg);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  
  const fetchUserData = useCallback(async () => {
    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/user/get-one-user/${userId}`);
      if (response.data.success) {
        const data: User = response.data.data;
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setRole(data.isAdmin ? "Super Admin" : "User");
        setPreviewImage(data.profilePicture || profileImg);
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("An error occurred while fetching user details.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Fetch user data on mount
  useEffect(() => {
    setTitle("Profile");
    fetchUserData();
  }, [setTitle, fetchUserData]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!firstName || !lastName) {
      setError("First Name and Last Name are required.");
      return;
    }

    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      if (profilePicture) formData.append("profilePicture", profilePicture);

      const response = await apiClient.put("/user/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Update response:", response.data); // Confirm data

      if (response.data.success) {
        const updatedUser = response.data.data;
        setFirstName(updatedUser.firstName);
        setLastName(updatedUser.lastName);
        setPreviewImage(`${updatedUser.profilePicture}?${Date.now()}`); // Prevent caching

        setSuccessMessage("Profile updated successfully!");
        await fetchUserData(); // Refresh data
      } else {
        setError(response.data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("An error occurred while updating your profile.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className={styles.profile_Section}>
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <div className={styles.profile_upper_section}>
        <img src={previewImage} alt="profile picture" />
        <div className={styles.profile_details}>
          <h2>{`${firstName} ${lastName}`}</h2>
          <p>{role}</p>
          <div className={styles.profile_email}>
            <p>{email}</p>
            <img src={copyIcon} alt="Copy email icon" />
          </div>
        </div>
      </div>

      <div className={styles.changeDpBtn}>
        <label htmlFor="profilePictureInput" className={styles.changeDpLabel}>
          Change Profile Picture
        </label>
        <input
          type="file"
          id="profilePictureInput"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <h2 className={styles.form_header}>Account Details</h2>
      <form
        className={styles.profile_form}
        onSubmit={(e) => {
          e.preventDefault();
          handleProfileUpdate();
        }}
      >
        <div className={styles.profile_form_section}>
          <div className={styles.addAdmin_form_left}>
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.addAdmin_input}
            />
          </div>
          <div className={styles.addAdmin_form_right}>
            <Input
              label="First Name"
              type="text"
              name="firstName"
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.addAdmin_input}
            />
          </div>
        </div>
        <PrimaryButton
          label="Change Password"
          onClick={handleOpenModal}
          className={styles.fullWidthButton}
          type="button"
        />
       
      </form>
      <PrimaryButton
          label={updating ? "Updating Profile..." : "Edit Profile"}
          onClick={handleProfileUpdate}
          className={styles.editProfileButton}
          type="button"
          disabled={updating}
        />
      {isModalOpen && <ChangePasswordModal onClose={handleCloseModal} />}
    </section>
  );
};

export default Settings;
