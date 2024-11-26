import React, { useEffect, useState } from "react";
import styles from "./LocationTable.module.css";
import PrimarySearchInput from "../../input/search-input/PrimarySearchInput";
import downloadIcon from '../../../assets/svg/button-icon/material-symbols_download (1).svg';
import rightArrow from '../../../assets/svg/table-icons/arrow-right.svg';
import leftArrow from '../../../assets/svg/table-icons/arrow-left.svg';
import apiClient from '../../../utils/apiClient';

// Define the User interface for the API response
interface User {
  stringAddress?: string;
  isVerified: boolean;
}

// Define the LocationData interface for the transformed data
interface LocationData {
  area: string;
  totalUsers: number;
  activeUsers: number;
}

const LocationTable: React.FC = () => {
  const [data, setData] = useState<LocationData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/user/get-all?page=${currentPage}`);

        // Extract data from the API response
        const { users, totalPages } = response.data.data;

        // Transform the user data into location-based data
        const transformedData: LocationData[] = users.map((user: User) => ({
          area: user.stringAddress || "Unknown",
          totalUsers: 1, // Each user contributes to the total count
          activeUsers: user.isVerified ? 1 : 0, // Active if the user is verified
        }));

        setData(transformedData);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [currentPage]);

  // Filter data based on the search query
  const filteredData = data.filter((location) =>
    location.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate the filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  return (
    <section className={styles.locationTableSection}>
      <div className={styles.tableHeader}>
        <h2>Location Details</h2>
        <div className={styles.searchExportContainer}>
          <PrimarySearchInput
            placeholder="Search users locations..."
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Areas</th>
                <th>Total Users</th>
                <th>Active Users</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((location, index) => (
                  <tr key={index}>
                    <td><input type="checkbox" /></td>
                    <td className={styles.areaColumn}>{location.area}</td>
                    <td>{location.totalUsers}</td>
                    <td>{location.activeUsers}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No data found</td>
                </tr>
              )}
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
        </>
      )}
    </section>
  );
};

export default LocationTable;
