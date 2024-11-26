import { useState } from "react";
import Input from "../../input/Input";
import styles from "./LoginForm.module.css";
import PrimaryButton from "../../buttons/primary-button/PrimaryButton";
import Checkbox from "../../input/check-box/CheckBox";
import Spinner from "../../spinner/Spinner";

interface LoginFormProps {
  onLogin: (emailOrUsername: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async () => {
    if (!emailOrUsername || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onLogin(emailOrUsername, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login_form_container}>
      <h2>Login</h2>
      <p>Welcome back! Please enter your details.</p>
      <div className={styles.login_form_wrapper}>
        <Input
          label="Email or Username"
          type="text"
          name="emailOrUsername"
          placeholder="Enter your email or username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          // error={error}
          className={styles.login_input}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.login_input}
        />
        <div className={styles.check_forget}>
          <Checkbox
            label="Remember for 30 days"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <p>Forgot password</p>
        </div>

        <PrimaryButton
          label={loading ? "Logging in..." : "Login"}
          onClick={handleSubmit}
          className={styles.fullWidthButton}
          disabled={loading}
          icon={loading && <Spinner />}
        />

        {error && <p className={styles.error_message}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
