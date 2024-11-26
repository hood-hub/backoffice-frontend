import React from "react";
import styles from "./AddAdminModal.module.css";
import PrimaryButton from "../../../components/buttons/primary-button/PrimaryButton";
import suucesIcon from '../../../assets/svg/modal-icons/Featured icon (4).svg'

interface AddAdminModalProps {
  message: string;
  onClose: () => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ message, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
            <img src={suucesIcon} alt="" />
          <h2>New User Added</h2>
         
        </header>
        <div className={styles.modalBody}>
          <p>{message}</p>
        </div>
        <footer className={styles.modalFooter}>
          <PrimaryButton label="Close" onClick={onClose} className={styles.closebtn} />
        </footer>
      </div>
    </div>
  );
};

export default AddAdminModal;
