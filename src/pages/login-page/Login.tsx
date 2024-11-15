import LoginForm from "../../components/forms/login-form/LoginForm";
import styles from './Login.module.css'
import bgImg from '../../assets/images/form-img/Section.png'
import logo from '../../assets/svg/logo/Frame.svg'




const Login: React.FC = () => {
 

  return (
    <div className={styles.login_section}>
      <div className={styles.login_container}>
        <div className={styles.login_form_wrapper}>
          <img src={logo} alt="logo" />
          <div className={styles.formContainer}>
            <LoginForm/>
          </div>
          
        </div>
        <div className={styles.backgroud_img}>
          <img 
            src={bgImg}
            alt="" 
           />
        </div>
      </div>
     
    </div>
  );
};

export default Login;
