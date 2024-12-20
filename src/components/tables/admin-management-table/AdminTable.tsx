import React, { useState } from "react";
import styles from "./AdminTable.module.css";
import FaFilter from "../../../assets/svg/table-icons/material-symbols_download.svg";
import rightArrow from "../../../assets/svg/table-icons/arrow-right.svg";
import leftArrow from "../../../assets/svg/table-icons/arrow-left.svg";
import apiClient from "../../../utils/apiClient";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastSignedIn: string;
  profileImage?: string;
}

interface AdminTableProps {
  users: User[];
  setAdmins: React.Dispatch<React.SetStateAction<User[]>>;
}

const convertToCSV = (data: object[]): string => {
  if (!data.length) return "";
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).map((val) => `"${val}"`).join(",")).join("\n");
  return `${headers}\n${rows}`;
};

const downloadCSV = (data: object[], filename: string) => {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

const AdminTable: React.FC<AdminTableProps> = ({ users, setAdmins }) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const deactivateAdmin = async (id: number) => {
    setLoadingId(id);
    setMessage(null);
    try {
      const response = await apiClient.put(`/user/admin/deactivate-admin/${id}`);
      if (response.data.success) {
        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin.id === id ? { ...admin, role: "Inactive" } : admin
          )
        );
        setMessage({ type: "success", text: "Admin deactivated successfully!" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to deactivate admin." });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className={styles.userTableSection}>
      <header className={styles.header}>
        <h2>Users</h2>
        <div className={styles.headerButtons}>
          <button className={styles.exportButton} onClick={() => downloadCSV(users, "admin_data")}>
            <img src={FaFilter} alt="" /> Export
          </button>
        </div>
      </header>

      {message && (
        <div className={message.type === "success" ? styles.successMessage : styles.errorMessage}>
          {message.text}
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Names</th>
            <th>Role</th>
            <th>Last Signed In</th>
            <th>Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.userInfo}>
                  <img
                    src={user.profileImage || "../../assets/images/table-img/table-img1.jpg"}
                    alt="Profile"
                    className={styles.profileImage}
                  />
                  <div>
                    <p className={styles.userName}>{user.name}</p>
                    <p className={styles.userEmail}>{user.email}</p>
                  </div>
                </div>
              </td>
              <td className={styles.role}>{user.role}</td>
              <td className={styles.lastSignedIn}>{user.lastSignedIn}</td>
              <td>
                <button
                  onClick={() => deactivateAdmin(user.id)}
                  className={`${styles.deactivateButton} ${styles.redButton}`}
                  disabled={loadingId === user.id}
                >
                  {loadingId === user.id ? "Deactivating..." : "Deactivate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className={styles.pagination}>
        <button className={styles.paginationButton}>
          <img src={leftArrow} alt="" />
          Previous
        </button>
        <div className={styles.pageNumbers}>
          <button className={styles.pageNumber}>1</button>
          <button className={styles.pageNumber}>2</button>
          <span>...</span>
          <button className={styles.pageNumber}>10</button>
        </div>
        <button className={styles.paginationButton}>
          Next
          <img src={rightArrow} alt="" />
        </button>
      </footer>
    </section>
  );
};

export default AdminTable;
