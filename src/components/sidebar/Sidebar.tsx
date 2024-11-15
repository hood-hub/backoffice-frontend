import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { AllNavLinks } from '../../constants/allNavLinks';
import logo from '../../assets/svg/logo/Frame.svg'
import logoutIcon from '../../assets/svg/sidebar-icons/ic_outline-log-out.svg'


const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <div className={styles.logo_container}>
          <img src={logo} alt="" />
        </div>
        <h2>Welcome user</h2>
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
      <div className={styles.logOut_container}>
        <img src={logoutIcon} alt="logout icon" />
        Logout
      </div>
    </aside>
  );
};

export default Sidebar;
