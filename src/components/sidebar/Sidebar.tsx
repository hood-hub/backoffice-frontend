import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { RootState } from "../../redux/store"; 
import styles from "./Sidebar.module.css";
import { AllNavLinks } from "../../constants/allNavLinks";
import logo from "../../assets/svg/logo/Frame.svg";
import logoutIcon from "../../assets/svg/sidebar-icons/ic_outline-log-out.svg";
import LogoutModal from "../modals/logout-modal/LogoutModal";
import { logout } from "../../redux/slices/authSlice";

const Sidebar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const user = useSelector((state: RootState) => state.auth.user);
  const firstName = user?.firstName || "User";  

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebar_header}>
          <div className={styles.logo_container}>
            <img src={logo} alt="Logo" />
          </div>
          <h2>Welcome, {firstName}</h2> 
        </div>
        <nav className={styles.nav}>
          {AllNavLinks.map((navItem, index) => (
            <NavLink
              to={navItem.link}
              key={index}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
              }
            >
              <img src={navItem.icon} alt={`${navItem.name} icon`} className={styles.icon} />
              <span>{navItem.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className={styles.logOut_container} onClick={handleOpenModal}>
          <img src={logoutIcon} alt="logout icon" />
          Logout
        </div>
      </aside>

      {isModalOpen && <LogoutModal onClose={handleCloseModal} onConfirm={confirmLogout} />}
    </>
  );
};

export default Sidebar;
