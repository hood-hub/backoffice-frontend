import { useState, useEffect } from "react";
import Header from "./user-management-upper/Header";
import { useNavbar } from "../../hooks/useNavbar";
import AdminTable from "../../components/tables/admin-management-table/AdminTable";
import apiClient from "../../utils/apiClient";
import lodingIcon from '../../assets/svg/table-icons/Dual Ball@1x-1.0s-200px-200px.svg'
import styles from './UserManagement.module.css'

const UserManagement = () => {
  // State for searched value and admin data
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [admins, setAdmins] = useState([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  const { setTitle } = useNavbar();

  useEffect(() => {
    setTitle("User Management");

    // Fetch admins from the API
    const fetchAdmins = async () => {
      try {
        setLoading(true); 
        const response = await apiClient.get("/user/admin/get-all");
        const adminData = response.data.data; 
        const transformedData = adminData.map((admin: any) => ({
          id: admin._id, 
          name: `${admin.firstName} ${admin.lastName}`, 
          email: admin.email,
          role: admin.isAdmin ? "Admin" : "User", 
          lastSignedIn: new Date(admin.updatedAt).toLocaleString(), 
          profileImage: "../../assets/images/table-img/table-img1.jpg", 
        }));
        setAdmins(transformedData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch admin data");
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [setTitle]);

  // Render component
  return (
    <section>
      <Header 
        searchedValue={searchedValue}
        setSearchedValue={setSearchedValue}
      />
      {loading ? (
        <div className={styles.anime}>
          <img src={lodingIcon} alt="" />
        </div>
        
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <AdminTable users={admins} />
      )}
    </section>
  );
};

export default UserManagement;
