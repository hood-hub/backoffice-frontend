import React from "react";
import styles from "./GroupListTable.module.css";
import filterIcon from "../../../assets/svg/button-icon/Vector (5).svg";
import exportIcon from "../../../assets/svg/button-icon/material-symbols_download (1).svg";
import arrowleft from "../../../assets/svg/table-icons/arrow-left.svg";
import arrowright from "../../../assets/svg/table-icons/arrow-right.svg";

interface Group {
  id: string;
  groupName: string;
  members: number;
  dateCreated: string;
}

interface GroupListTableProps {
  groups: Group[];
}

const GroupListTable: React.FC<GroupListTableProps> = ({ groups }) => {
  // Function to export data to CSV
  const exportToCSV = () => {
    if (!groups || groups.length === 0) {
      alert("No data available to export.");
      return;
    }

    const csvHeader = ["Group Name,Members,Date Created"];
    const csvRows = groups.map(
      (group) =>
        `${group.groupName},${group.members},${group.dateCreated}`
    );

    const csvContent = [csvHeader, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "GroupList.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>Group List</h2>
        <div className={styles.actions}>
          <button className={styles.filterButton}>
            <img src={filterIcon} alt="" /> Filter
          </button>
          <button className={styles.exportButton} onClick={exportToCSV}>
            <img src={exportIcon} alt="" /> Export
          </button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Members</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td className={styles.groupName}>{group.groupName}</td>
              <td className={styles.groupMembers}>{group.members}</td>
              <td className={styles.groupDate}>{group.dateCreated}</td>
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

export default GroupListTable;
