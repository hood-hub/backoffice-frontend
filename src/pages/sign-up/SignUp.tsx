import styles from './SignUp.module.css'
import bgImg from '../../assets/images/form-img/Section.png'
import logo from '../../assets/svg/logo/Frame.svg'
import SignUpForm from "../../components/forms/sign-in-form/SignUpForm";




const SignUp: React.FC = () => {
 

  return (
    <div className={styles.login_section}>
      <div className={styles.login_container}>
        <div className={styles.login_form_wrapper}>
          <img src={logo} alt="logo" />
          <div className={styles.formContainer}>
            <SignUpForm/>
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

export default SignUp;
