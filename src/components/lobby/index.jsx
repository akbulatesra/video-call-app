import styles from './styles.module.scss';
import Footer from '../footer';
import { useState } from 'react';
import Button from '../button';

const Lobby = ({ setRoom }) => {
  const [identity, setIdentity] = useState('');

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperLeft}>
        <div className={styles.header}>
          Connect face-to-face, no matter where you are.
        </div>
        <input
          value={identity}
          placeholder="What's your name?"
          onChange={(e) => setIdentity(e.target.value)}
        />
        <Button identity={identity} setRoom={setRoom} />
        <Footer />
      </div>
      <img src="/main.jpg" alt="girl" className={styles.wrapperRight} />
    </div>
  );
};
export default Lobby;
