
import styles from "./Bussiness.module.css"; 

const Bussiness: React.FC = () => {
  return (
    <div className={styles.powerBIContainer}>
      <iframe
        title="HoodhubPBI"
        width="100%" 
        height="600" 
        src="https://app.powerbi.com/view?r=eyJrIjoiM2U3YjcwYTItMjlmOS00ZjM0LWE5MTItYmUxNGM5NGI4MzFmIiwidCI6Ijc5YmEwMzdiLWQ5NWUtNGY4Ni1hYzVkLWQwMzNmNGVmNzVlNCJ9"
        frameBorder="0"
        allowFullScreen={true}
      />
    </div>
  );
};

export default Bussiness;
