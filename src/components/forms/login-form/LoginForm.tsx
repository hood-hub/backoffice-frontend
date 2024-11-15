import { useState } from "react";
import Input from "../../input/Input"
import styles from './LoginForm.module.css'
import PrimaryButton from "../../buttons/primary-button/PrimaryButton";
import Checkbox from "../../input/check-box/CheckBox";
import { Link } from "react-router-dom";


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Login logic here
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    };
  return (
    <div className={styles.login_form_container}>
        <h2>Login</h2>
        <p>Welcome back! Please enter your details.</p>
        <div className={styles.login_form_wrapper}>
            <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error} // Optional error message
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
           {/* button */}
            <PrimaryButton label="Login" onClick={handleLogin} className={styles.fullWidthButton} />
            <div className={styles.dontAcct}>
                Don’t have an account?&nbsp;
                <Link to='/register'><span> Sign up</span></Link>
            </div>
        </div>
    </div>
  )
}

export default LoginForm
