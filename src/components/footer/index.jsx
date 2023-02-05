import { FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from './styles.module.scss';
const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div>This website created by Esra Akbulat</div>
      <div className={styles.icons}>
        <FaGithub />
        <FaLinkedin />
      </div>
    </div>
  );
};
export default Footer;
