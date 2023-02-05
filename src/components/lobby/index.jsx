import styles from './styles.module.scss';
import Footer from '../footer';
import Button from '../button';

const Lobby = ({ joinRoom, updateIdentity, identity }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperLeft}>
        <div className={styles.header}>
          Connect face-to-face, no matter where you are.
        </div>
        <input
          value={identity}
          placeholder="What's your name?"
          onChange={updateIdentity}
        />
        <Button identity={identity} joinRoom={joinRoom} />
        <Footer />
      </div>
      <img src="/main.jpg" alt="girl" className={styles.wrapperRight} />
    </div>
  );
};
export default Lobby;
