import styles from './ChangePasswordModal.module.css'
import passwordIcon from '../../assets/svg/modal-icons/Featured icon (1).svg'
import Input from '../../components/input/Input'

const ChangePasswordModal = () => {
  return (
    <div className={styles.changepasswordModal_wrapper}>
      <div className={styles.changepasswordModal_container}>
        <img src={passwordIcon} alt="" />
        <h2>Change password</h2>
        <div className={styles.changePassword_form}>
            <Input
                label="Old Password"
                type="password"
                name="password"
                placeholder="Enter your old password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.addAdmin_input}
            />
            <Input
              label="New Password"
              type="password"
              name="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.addAdmin_input}
            />
            <Input
              label="Re-enter New password*"
              type="password"
              name="password"
              placeholder="Re-enter New password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.addAdmin_input}
            />
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordModal
