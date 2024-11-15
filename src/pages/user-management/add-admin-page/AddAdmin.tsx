import { useState } from 'react';
import Header from '../../../components/header/Header';
import Input from '../../../components/input/Input';
import styles from './AddAdmin.module.css';
import PrimaryButton from '../../../components/buttons/primary-button/PrimaryButton';

const AddAdmin = () => {
  // State variables for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Error message if needed

  // Function to handle form submission
  const handleSubmit = () => {
    // Simple validation
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Additional validation for email format could go here
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Clear any existing error and proceed with submission logic
    setError('');
    // Add admin data submission logic here (e.g., API call)
    console.log("Admin data submitted:", { firstName, lastName, email, password });
  };

  return (
    <section className={styles.addAdmin_page}>
      <div className={styles.addAdmin_container}>
        <Header title="Add Admin" />
        <div className={styles.addAdmin_form}>
          <div className={styles.addAdmin_form_left}>
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
              label="Last Name"
              type="text" 
              name="lastName"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.addAdmin_input}
            />
          </div>
          <div className={styles.addAdmin_form_right}>
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
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your default password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.addAdmin_input}
            />
          </div>
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
        <PrimaryButton label="Submit" onClick={handleSubmit} className={styles.fullWidthButton} />
      </div>
    </section>
  );
};

export default AddAdmin;
