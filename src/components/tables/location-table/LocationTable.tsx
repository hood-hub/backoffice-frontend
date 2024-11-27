import React, { useEffect, useState } from "react";
import styles from "./LocationTable.module.css";
import PrimarySearchInput from "../../input/search-input/PrimarySearchInput";
import downloadIcon from '../../../assets/svg/button-icon/material-symbols_download (1).svg';
// import rightArrow from '../../../assets/svg/table-icons/arrow-right.svg';
// import leftArrow from '../../../assets/svg/table-icons/arrow-left.svg';
import apiClient from '../../../utils/apiClient';

// Define the LocationData interface
interface LocationData {
  area: string;
  totalUsers: number;
  activeUsers: number;
}

// Define available locations
const locations = ["north-london", "east-london", "west-london", "south-london"];

const LocationTable: React.FC = () => {
  const [data, setData] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchAllLocations = async () => {
      setLoading(true);
      try {
        const locationData: LocationData[] = [];

        for (const location of locations) {
          const response = await apiClient.get(`/user/get-all?page=1&location=${location}`);
          const { users } = response.data.data;

          // Calculate total and active users for the current location
          const totalUsers = users.length;
          const activeUsers = users.filter((user: any) => user.isVerified).length;

          locationData.push({
            area: location.replace("-", " ").toUpperCase(),
            totalUsers,
            activeUsers,
          });
        }

        setData(locationData);
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLocations();
  }, []);

  // Filter data based on the search query
  const filteredData = data.filter((location) =>
    location.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className={styles.locationTableSection}>
      <div className={styles.tableHeader}>
        <h2>Location Details</h2>
        <div className={styles.searchExportContainer}>
          <PrimarySearchInput
            placeholder="Search locations..."
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <button className={styles.exportButton}>
            <img src={downloadIcon} alt="Download Icon" />
            Export
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Area</th>
              <th>Total Users</th>
              <th>Active Users</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((location, index) => (
                <tr key={index}>
                  <td>{location.area}</td>
                  <td>{location.totalUsers}</td>
                  <td>{location.activeUsers}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default LocationTable;
