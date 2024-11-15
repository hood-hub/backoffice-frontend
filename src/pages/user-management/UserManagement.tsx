import { useState, useEffect } from "react";
import Header from "./user-management-upper/Header";
import { useNavbar } from "../../hooks/useNavbar";
import AdminTable from "../../components/tables/admin-management-table/AdminTable";
import tableImg1 from '../../assets/images/table-img/table-img1.jpg';
import tableImg2 from '../../assets/images/table-img/table-img2.jpg';


const users = [
  { id: 1, name: 'Olivia Rhye', email: 'olivia@gmail.com', role: 'Super Admin', lastSignedIn: '2024-03-15 00:43am', profileImage: tableImg1 },
  { id: 2, name: 'Phoenix Baker', email: 'phoenix@gmail.com', role: 'User Admin', lastSignedIn: '2024-03-15 00:43am', profileImage: tableImg2 },
  // Add more users here
];

const UserManagement = () => {
  //  the state for the searched value
  const [searchedValue, setSearchedValue] = useState<string>("");
  const { setTitle } = useNavbar();

  useEffect(() => {
    setTitle("User Management");
  }, [setTitle]);

  return (
    <section>
      <Header 
        searchedValue={searchedValue}
        setSearchedValue={setSearchedValue}
      />
    <AdminTable users={users}/>
    </section>
  );
}

export default UserManagement;
