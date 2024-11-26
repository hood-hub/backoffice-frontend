import React from 'react';
import styles from './UserListTable.module.css';
import exportIcon from '../../../assets/svg/button-icon/Vector (5).svg';
import filterIcon from '../../../assets/svg/button-icon/material-symbols_download (1).svg';
import arrowleft from '../../../assets/svg/table-icons/arrow-left.svg';
import arrowright from '../../../assets/svg/table-icons/arrow-right.svg';

// Define the User interface
interface User {
  id: string; 
  name: string;
  email: string;
  username: string;
  joined: string; 
  location: string;
  status: 'Active' | 'Pending'; 
  avatar: string; 
}

// Props interface for the UserListTable
interface UserListTableProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  tempLoading: boolean; 
}

const UserListTable: React.FC<UserListTableProps> = ({
  users,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  tempLoading,
}) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>User List</h2>
        <div className={styles.actions}>
          <div className={styles.filterButton}>
            <img src={exportIcon} alt="" />
            Filter
          </div>
          <div className={styles.exportButton}>
            <img src={filterIcon} alt="" />
            Export
          </div>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Names</th>
            <th>Usernames</th>
            <th>Date & Time Joined</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td><input type="checkbox" /></td>
                <td className={styles.userCell}>
                  <img src={user.avatar} alt={`${user.name} avatar`} className={styles.avatar} />
                  <div className={styles.usernameEmail}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userEmail}>{user.email}</span>
                  </div>
                </td>
                <td className={styles.userNamemain}>{user.username}</td>
                <td className={styles.userNamemain}>{user.joined}</td>
                <td className={styles.location}>{user.location}</td>
                <td>
                  <span className={user.status === 'Active' ? styles.activeStatus : styles.pendingStatus}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          className={styles.pageButtonPrev}
          onClick={onPreviousPage}
          disabled={currentPage === 1 || tempLoading}
        >
          <img src={arrowleft} alt="Previous" />
          {tempLoading && currentPage > 1 ? 'Loading...' : 'Previous'}
        </button>
        <div className={styles.pageNumbers}>
          Page {currentPage} of {totalPages}
        </div>
        <button
          className={styles.pageButton}
          onClick={onNextPage}
          disabled={currentPage === totalPages || tempLoading}
        >
          {tempLoading && currentPage < totalPages ? 'Loading...' : 'Next'}
          <img src={arrowright} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default UserListTable;
