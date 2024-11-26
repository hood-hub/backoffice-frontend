import React from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { loginUser } from "../../redux/slices/authSlice";
import LoginForm from "../../components/forms/login-form/LoginForm";
import styles from "./Login.module.css";
import bgImg from "../../assets/images/form-img/Section.png";
import logo from "../../assets/svg/logo/Frame.svg";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await dispatch(loginUser({ emailOrUsername: email, password })).unwrap();
      navigate("/home"); 
    } catch (err: any) {
      console.error("Login failed:", err);
      alert(err);
    }
  };

  return (
    <div className={styles.login_section}>
      <div className={styles.login_container}>
        <div className={styles.login_form_wrapper}>
          <img src={logo} alt="logo" />
          <div className={styles.formContainer}>
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
        <div className={styles.backgroud_img}>
          <img src={bgImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
