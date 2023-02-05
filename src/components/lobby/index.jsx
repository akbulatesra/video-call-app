import styles from './styles.module.scss';
import Footer from '../footer';
import { useState } from 'react';

const Lobby = ({ setRoom }) => {
  const { connect } = require('twilio-video');

  const [identity, setIdentity] = useState('');

  const disabled = Boolean(!identity);

  const joinRoom = async () => {
    try {
      const response = await fetch(
        `https://token-service-2-7678-dev.twil.io/token?identity=${identity}`
      );
      const data = await response.json();
      const room = await connect(data.accessToken, {
        name: 'cool-room',
        audio: true,
        video: true,
      });

      setRoom(room);
    } catch (err) {
      console.log(err);
    }
  };

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
        <button disabled={disabled} onClick={joinRoom}>
          Join Room
        </button>
        <Footer />
      </div>
      <img src="/main.jpg" alt="girl" className={styles.wrapperRight} />
    </div>
  );
};
export default Lobby;
