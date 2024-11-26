import React from "react";
import styles from "./ReportListTable.module.css";
import filterIcon from "../../../assets/svg/button-icon/material-symbols_download (1).svg";
import arrowleft from "../../../assets/svg/table-icons/arrow-left.svg";
import arrowright from "../../../assets/svg/table-icons/arrow-right.svg";

interface Report {
  id: string;
  username: string;
  dateFlagged: string;
  reason: string;
  status: "Open" | "Resolved";
}

interface ReportListTableProps {
  reports: Report[];
}

const ReportListTable: React.FC<ReportListTableProps> = ({ reports }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>Report List</h2>
        <div className={styles.actions}>
          <div className={styles.exportButton}>
            <img src={filterIcon} alt="" />
            Export
          </div>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Usernames</th>
            <th>Date Flagged</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td className={styles.username}>{report.username}</td>
              <td className={styles.date}>{report.dateFlagged}</td>
              <td className={styles.date}>{report.reason}</td>
              <td>
                <span
                  className={
                    report.status === "Open" ? styles.openStatus : styles.resolvedStatus
                  }
                >
                  {report.status}
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
          <button className={styles.pageNumber}>1</button>
          <button className={styles.pageNumber}>2</button>
          <button className={styles.pageNumber}>3</button>
          <span>...</span>
          <button className={styles.pageNumber}>10</button>
        </div>
        <button className={styles.pageButton}>
          Next
          <img src={arrowright} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default ReportListTable;
