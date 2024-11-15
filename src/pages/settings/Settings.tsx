import { useState, useEffect } from "react";
import { useNavbar } from "../../hooks/useNavbar";
import styles from './Settings.module.css';
import profileImg from '../../assets/images/profilpics.jpg';
import copyIcon from '../../assets/svg/profile-icon/solar_copy-linear.svg';
import Input from "../../components/input/Input";
import PrimaryButton from "../../components/buttons/primary-button/PrimaryButton";

const Settings = () => {
  const { setTitle } = useNavbar();

  // State variables for form inputs
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = () => {

  }
  useEffect(() => {
    setTitle("Profile");
  }, [setTitle]);

  

  return (
    <section className={styles.profile_Section}>
      <div className={styles.profile_upper_section}>
        <img src={profileImg} alt="profile picture" />
        <div className={styles.profile_details}>
          <h2>Joshua Christian</h2>
          <p>Super Admin</p>
          <div className={styles.profile_email}>
            josh@hoodhub.com
            <img src={copyIcon} alt="copy email icon" />
          </div>
        </div>
      </div>
      <h2 className={styles.form_header}>Account Details</h2>
      <form className={styles.profile_form} >
        <div className={styles.profile_form_section}>
          <div className={styles.addAdmin_form_left}>
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.addAdmin_input}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && email === "" ? error : ""}
              className={styles.addAdmin_input}
            />
          </div>
          <div className={styles.addAdmin_form_right}>
            <Input
              label="First Name"
              type="text"
              name="firstName"
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.addAdmin_input}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.addAdmin_input}
            />
            change password
          </div>
        </div>
        <Input
            label="Role"
            type="text"
            name="firstName"
            placeholder="Super Admin"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.superAdmin_input}
          />
      </form>
      <PrimaryButton label="Edit Profile" onClick={handleLogin} className={styles.editProfileButton} />
    </section>
  );
};

export default Settings;
