import userManagementIcon from '../assets/svg/sidebar-icons/icons8_group.svg';
import dashboardIcon from '../assets/svg/sidebar-icons/mage_dashboard.svg';
import flaggedpostIcon from '../assets/svg/sidebar-icons/solar_flag-outline.svg';
import ReportsIcon from '../assets/svg/sidebar-icons/tabler_report.svg';
import SettingsIcon from '../assets/svg/sidebar-icons/gg_profile.svg';

export const AllNavLinks = [
    {
        name: "Home",
        icon: dashboardIcon,
        link: "/home", // update path
    },
    {
        name: "Admin Management",
        icon: userManagementIcon,
        link: "/user-management", 
    },
    {
        name: "Flagged Post",
        icon: flaggedpostIcon,
        link: "/flagged-post", 
    },
    {
        name: "Reports",
        icon: ReportsIcon,
        link: "/reports", 
    },
    {
        name: "Bussiness Intelligence",
        icon: ReportsIcon,
        link: "/bussiness-intelligence", 
    },
    {
        name: "Profile",
        icon: SettingsIcon,
        link: "/settings", 
    },
];
