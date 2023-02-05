import styles from './styles.module.scss';
const Button = ({ identity, setRoom }) => {
  const { connect } = require('twilio-video');

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
    <svg
      viewBox="45 60 400 320"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svg}
      onClick={joinRoom}
    >
      <path
        fill="#fff"
        d="M 90 210 C 90 180 90 150 90 150 C 150 150 180 150 180 150 C 180 150 300 150 300 150 C 300 150 330 150 390 150 C 390 150 390 180 390 210 C 390 240 390 270 390 270 C 330 270 300 270 300 270 C 300 270 180 270 180 270 C 180 270 150 270 90 270 C 90 270 90 240 90 210"
        mask="url(#knockout-text)"
      ></path>
      <mask id="knockout-text">
        <rect width="100%" height="100%" fill="#fff" x="0" y="0" />
        <text x="147" y="227" fill="#000">
          join room
        </text>
      </mask>
    </svg>
  );
};
export default Button;
