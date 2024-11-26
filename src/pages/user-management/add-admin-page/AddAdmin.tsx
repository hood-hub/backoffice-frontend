import { useState } from "react";
import Header from "../../../components/header/Header";
import Input from "../../../components/input/Input";
import styles from "./AddAdmin.module.css";
import PrimaryButton from "../../../components/buttons/primary-button/PrimaryButton";
import apiClient from "../../../utils/apiClient";
import AddAdminModal from "../../../components/modals/add-admin-modal/AddAdminModal";


const AddAdmin = () => {
  // State variables for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Success message to display in the modal
  const [modalMessage, setModalMessage] = useState("A message has been sent to your email address].");

  // Function to handle form submission
  const handleSubmit = async () => {
    // Simple validation
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Clear previous error
    setError(null);

    try {
      setLoading(true);

      // API request to create admin
      const response = await apiClient.post("/user/admin", {
        firstName,
        lastName,
        email,
        password,
      });

      // Show success modal
      const { message } = response.data;
      setModalMessage(`${message}. Email: ${email}, Password: ${password}`);
      setIsModalVisible(true);

      // Clear form inputs
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to create admin.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        <PrimaryButton
          label={loading ? "Submitting..." : "Submit"}
          onClick={handleSubmit}
          className={styles.fullWidthButton}
          disabled={loading}
        />
      </div>

      {/* AddAdminModal Component */}
      {isModalVisible && (
        <AddAdminModal
          message={modalMessage}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </section>
  );
};

export default AddAdmin;
