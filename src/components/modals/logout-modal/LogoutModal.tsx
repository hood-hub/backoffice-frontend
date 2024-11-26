import React from "react";
import styles from "./LogoutModal.module.css";
import logoutIcon from "../../../assets/svg/modal-icons/Featured icon (3).svg";
import PrimaryButton from "../../buttons/primary-button/PrimaryButton";

interface LogoutModalProps {
  onClose: () => void;  
  onConfirm: () => void; 
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.logoutImg_container}>
          <img src={logoutIcon} alt="Logout Icon" />
        </div>
        <h3>Logout Account</h3>
        <p>Are you sure you want to log out?</p>
        <div className={styles.modalActions}>
          <PrimaryButton label="Cancel" onClick={onClose} className={styles.CancelButton} />
          <PrimaryButton label="Logout" onClick={onConfirm} className={styles.ConfirmButton} />
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
