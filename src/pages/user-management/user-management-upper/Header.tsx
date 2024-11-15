import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/buttons/primary-button/PrimaryButton";
import PrimarySearchInput from "../../../components/input/search-input/PrimarySearchInput";
import styles from './Header.module.css';
import addIcon from '../../../assets/svg/button-icon/Vector (3).svg';

interface IProps {
    searchedValue: string;
    setSearchedValue: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ searchedValue, setSearchedValue }: IProps) => {
    const navigate = useNavigate();

    const handleAddUser = () => {
        navigate("/add-admin"); // Adjust the path as needed
    };

    return (
        <div className={styles.usersTopSection}>
            <PrimarySearchInput
                placeholder="search users ..."
                value={searchedValue}
                onChange={(e) => setSearchedValue(e.target.value)}
                className={styles.search_input_wrapper}
            />
            <PrimaryButton 
                label="Add Admin" 
                onClick={handleAddUser} 
                className={styles.addUserButton} 
                icon={<img src={addIcon} alt="Add icon" className={styles.buttonIcon} />}
            />
        </div>
    );
};

export default Header;
