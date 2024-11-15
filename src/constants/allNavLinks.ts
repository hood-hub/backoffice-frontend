import userManagementIcon from '../assets/svg/sidebar-icons/icons8_group.svg';
import dashboardIcon from '../assets/svg/sidebar-icons/mage_dashboard.svg';
import flaggedpostIcon from '../assets/svg/sidebar-icons/solar_flag-outline.svg';
import ReportsIcon from '../assets/svg/sidebar-icons/tabler_report.svg';
import SettingsIcon from '../assets/svg/sidebar-icons/solar_settings-outline.svg';

export const AllNavLinks = [
    {
        name: "Home",
        icon: dashboardIcon,
        link: "/home", // update path
    },
    {
        name: "Admin Management",
        icon: userManagementIcon,
        link: "/user-management", // update path
    },
    {
        name: "Flagged Post",
        icon: flaggedpostIcon,
        link: "/flagged-post", // update path
    },
    {
        name: "Reports",
        icon: ReportsIcon,
        link: "/reports", // update path
    },
    {
        name: "Profile",
        icon: SettingsIcon,
        link: "/settings", // update path
    },
];
