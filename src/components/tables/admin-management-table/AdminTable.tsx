import React from 'react';
import styles from './AdminTable.module.css';
import  FaFileExport  from '../../../assets/svg/table-icons/mdi_filter-outline.svg'; 
import FaFilter from '../../../assets/svg/table-icons/material-symbols_download.svg'
import rightArrow from '../../../assets/svg/table-icons/arrow-right.svg'
import leftArrow from '../../../assets/svg/table-icons/arrow-left.svg'
// Define the types for user data
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
}

const AdminTable: React.FC<AdminTableProps> = ({ users }) => {
  return (
    <section className={styles.userTableSection}>
      <header className={styles.header}>
        <h2>Users</h2>
        <div className={styles.headerButtons}>
          <button className={styles.filterButton}><img src={FaFileExport} alt="" /> Filter</button>
          <button className={styles.exportButton}><img src={FaFilter} alt="" /> Export</button>
        </div>
      </header>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Names</th>
            <th>Role</th>
            <th>Last Signed In</th>
            <th></th> {/* For the options menu (ellipsis icon) */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><input type="checkbox" /></td>
              <td>
                <div className={styles.userInfo}>
                  <img src={user.profileImage || '../../assets/images/table-img/table-img1.jpg'} alt="Profile" className={styles.profileImage} />
                  <div>
                    <p className={styles.userName}>{user.name}</p>
                    <p className={styles.userEmail}>{user.email}</p>
                  </div>
                </div>
              </td>
              <td className={styles.role}>{user.role}</td>
              <td className={styles.lastSignedIn}>{user.lastSignedIn}</td>
              <td><span className={styles.options}>⋮</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className={styles.pagination}>
        <button className={styles.paginationButton}><img src={leftArrow} alt="" />Previous</button>
        <div className={styles.pageNumbers}>
          {/* Replace with dynamic page numbers */}
          <button className={styles.pageNumber}>1</button>
          <button className={styles.pageNumber}>2</button>
          <span>...</span>
          <button className={styles.pageNumber}>10</button>
        </div>
        <button className={styles.paginationButton}>Next<img src={rightArrow} alt="" /></button>
      </footer>
    </section>
  );
};

export default AdminTable;
