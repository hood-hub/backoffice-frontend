import React, { useState } from "react";
import styles from "./ChangePasswordModal.module.css";
import lockIcon from "../../assets/svg/modal-icons/Featured icon (2).svg";
import Input from "../../components/input/Input";
import PrimaryButton from "../../components/buttons/primary-button/PrimaryButton";
import apiClient from "../../utils/apiClient";

interface ChangePasswordModalProps {
  onClose: () => void;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      setLoading(true);

      // Call API to change the password
      const response = await apiClient.put<ChangePasswordResponse>("/user/change-password", {
        oldPassword,
        newPassword,
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message || "Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose(); 
      } else {
        setError(response.data.message || "Failed to update the password.");
      }
    } catch (err: unknown) {
      setError("An error occurred while updating the password.");
      console.error("Error changing password:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setError(null);
    setSuccessMessage(null);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <img src={lockIcon} alt="Lock Icon" />
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          {successMessage && <p className={styles.success}>{successMessage}</p>}

          <Input
            label="Old Password"
            type="password"
            name="oldPassword"
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={styles.login_input}
          />
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.login_input}
          />
          <Input
            label="Re-enter New Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.login_input}
          />

          <div className={styles.buttonGroup}>
            <PrimaryButton
              label="Cancel"
              onClick={handleCancel}
              className={styles.fullWidthButton}
              disabled={loading}
            />
            <PrimaryButton
              label={loading ? "Processing..." : "Confirm"}
              onClick={() => {}}
              type="submit" 
              className={styles.ConfirmButton}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
