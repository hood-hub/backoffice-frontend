import React, { useState } from "react";
import styles from "./LocationTable.module.css"; 
import PrimarySearchInput from "../../input/search-input/PrimarySearchInput";
import downloadIcon from '../../../assets/svg/button-icon/material-symbols_download (1).svg'
import rightArrow from '../../../assets/svg/table-icons/arrow-right.svg'
import leftArrow from '../../../assets/svg/table-icons/arrow-left.svg'
interface LocationData {
  area: string;
  totalUsers: number;
  activeUsers: number;
  growthRate: string;
  density: string;
}

const mockData: LocationData[] = [
  { area: "Downtown", totalUsers: 1250, activeUsers: 1250, growthRate: "+15%", density: "High" },
  { area: "Downtown", totalUsers: 1250, activeUsers: 1250, growthRate: "+30%", density: "Medium" },
  { area: "Downtown", totalUsers: 1250, activeUsers: 1250, growthRate: "+2%", density: "High" },
  { area: "Downtown", totalUsers: 1250, activeUsers: 1250, growthRate: "+15%", density: "Medium" },
  { area: "Downtown", totalUsers: 1250, activeUsers: 1250, growthRate: "+15%", density: "Medium" },
  { area: "Downtown", totalUsers: 1250, activeUsers: 1250, growthRate: "+30%", density: "High" },
  { area: "Downtown", totalUsers: 1250, activeUsers: 1250, growthRate: "+2%", density: "Medium" },
  { area: "Downtown", totalUsers: 1250, activeUsers: 1250, growthRate: "+15%", density: "High" },
];

const LocationTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const filteredData = mockData.filter((data) =>
    data.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  return (
    <section className={styles.locationTableSection}>
      <div className={styles.tableHeader}>
        <h2>Location Details</h2>
        <div className={styles.searchExportContainer}>
          <PrimarySearchInput
            placeholder="Search users locations ... "
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <button className={styles.exportButton}>
            <img src={downloadIcon} alt="" />
            Export
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Areas</th>
            <th>Total Users</th>
            <th>Active Users</th>
            <th>Growth Rate</th>
            <th>Density</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((location, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td className={styles.areaColumn}>{location.area}</td>
              <td>{location.totalUsers}</td>
              <td>{location.activeUsers}</td>
              <td className={styles.growthRate}>
                <span className={location.growthRate.startsWith('+') ? styles.positive : styles.negative}>
                  {location.growthRate}
                </span>
              </td>
              <td>
                <span className={`${styles.density} ${styles[location.density.toLowerCase()]}`}>
                  {location.density}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
            <img src={leftArrow} alt="" />
          Previous
        </button>
        <div className={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? styles.activePage : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
         
          Next
          <img src={rightArrow} alt="" />
        </button>
      </div>
    </section>
  );
};

export default LocationTable;
