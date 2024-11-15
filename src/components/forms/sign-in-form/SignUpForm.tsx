import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Input from "../../input/Input";
import styles from './SignUpForm.module.css';
import PrimaryButton from "../../buttons/primary-button/PrimaryButton";

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        // Sign-up logic here
    };

    return (
        <div className={styles.login_form_container}>
            <h2>Sign up</h2>
            <div className={styles.login_form_wrapper}>
                <Input
                    label="Name"
                    type="name"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={error}
                    className={styles.login_input}
                />
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
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
                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.login_input}
                />
            </div>
            <PrimaryButton label="Sign Up" onClick={handleSignUp} className={styles.fullWidthButton} />
            <div className={styles.dontAcct}>
                Already have an account?&nbsp;
                <Link to="/login" className={styles.loginLink}> Login</Link>
            </div>
        </div>
    );
};

export default SignUpForm;
