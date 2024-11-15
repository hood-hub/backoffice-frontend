import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FlaggedTable.module.css';
import deleteicon from '../../../assets/svg/button-icon/fluent_delete-20-regular.svg';
import cancelIcon from '../../../assets/svg/button-icon/hugeicons_cancel-01.svg';
import arrowleft from '../../../assets/svg/table-icons/arrow-left.svg';
import arrowright from '../../../assets/svg/table-icons/arrow-right.svg';

interface Flag {
  title: string;
  userName: string;
  dateFlagged: string;
  reason: string;
  status: 'Solved' | 'Pending';
}

const flags: Flag[] = [
  { title: 'Inappropriate content in community', userName: 'John_doe', dateFlagged: '2024-03-15 00:43am', reason: 'Violates Community Rule', status: 'Solved' },
  { title: 'Harassment report in comments', userName: 'Jane_Smith', dateFlagged: '2024-03-15 00:43am', reason: 'Spam', status: 'Pending' },
  { title: 'Inappropriate content in community', userName: 'USER123', dateFlagged: '2024-03-15 00:43am', reason: 'Harassment', status: 'Pending' },
];

const FlaggedTable: React.FC = () => {
  const navigate = useNavigate(); 

  const handleRowClick = (flag: Flag) => {
    navigate(`/flag-details/${encodeURIComponent(flag.title)}`);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.actions}>
        <h2>Recent Flags</h2>
        <div className={styles.header_buttton}>
          <button className={styles.deleteButton}>
            <img src={deleteicon} alt="Delete" />
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
            <th><input type="checkbox" /></th>
            <th>Post Title</th>
            <th>User Names</th>
            <th>Date Flagged</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {flags.map((flag, index) => (
            <tr key={index} onClick={() => handleRowClick(flag)} className={styles.clickableRow}>
              <td><input type="checkbox" /></td>
              <td className={styles.title}>{flag.title}</td>
              <td className={styles.username}>{flag.userName}</td>
              <td className={styles.flagdate}>{flag.dateFlagged}</td>
              <td className={styles.flagreason}>
                <span className={styles.reason}>{flag.reason}</span>
              </td>
              <td>
                <span className={`${styles.status} ${styles[flag.status.toLowerCase()]}`}>
                  {flag.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button className={styles.pageButtonPrev}>
          <img src={arrowleft} alt="Previous" />
          Previous
        </button>
        <div className={styles.pageNumbers}>
          <span className={styles.pageNumber}>1</span>
          <span className={styles.pageNumber}>2</span>
          <span className={styles.pageNumber}>10</span>
        </div>
        <button className={styles.pageButton}>
          Next
          <img src={arrowright} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default FlaggedTable;
