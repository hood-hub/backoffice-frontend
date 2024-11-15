import { Link } from 'react-router-dom'; // Import Link component
import styles from './Onboard.module.css';
import logo from '../../assets/svg/logo/Frame.svg';
import Input from '../../components/input/Input';
import { useState } from 'react';
import PrimaryButton from '../../components/buttons/primary-button/PrimaryButton';

const Onboard = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const getStarted = () => {
    // Login logic here
  };

  return (
    <section className={styles.onboardSection}>
      <div className={styles.onboard_container}>
        <div className={styles.onboard_wrapper}>
          <img src={logo} alt="" />
          <h2>Create an account</h2>
          <Input
            label=""
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error} // Optional error message
            className={styles.onBoard_input}
          />
          <PrimaryButton label="Get started" onClick={getStarted} className={styles.getStartedButton} />
          <p>Already have an account?&nbsp; 
            <Link to="/login" className={styles.loginLink}>Log in</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Onboard;
