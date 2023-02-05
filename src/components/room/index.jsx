import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Participant from '../participant';
import Footer from '../footer';

const Room = ({ room, returnToLobby, ...props }) => {
  const [state, setState] = useState({
    remoteParticipants: Array.from(room.participants.values()),
  });

  useEffect(() => {
    room.on('participantConnected', (participant) =>
      addParticipant(participant)
    );
    room.on('participantDisconnected', (participant) =>
      removeParticipant(participant)
    );

    window.addEventListener('beforeunload', leaveRoom);

    return () => {
      window.removeEventListener('beforeunload', leaveRoom);
    };
  }, [room]);

  function addParticipant(participant) {
    console.log(`${participant.identity} has joined the room.`);

    setState((prev) => ({
      ...prev,
      remoteParticipants: [...prev.remoteParticipants, participant],
    }));
  }

  function removeParticipant(participant) {
    console.log(`${participant.identity} has left the room`);

    setState((prev) => ({
      ...prev,
      remoteParticipants: prev.remoteParticipants.filter(
        (p) => p.identity !== participant.identity
      ),
    }));
  }

  function leaveRoom() {
    room.disconnect();
    returnToLobby();
  }

  return (
    <div className={styles.room}>
      <div className={styles.navbar} onClick={leaveRoom}>
        Leave Room
      </div>
      <div className={styles.participants}>
        <Participant
          key={room.localParticipant.identity}
          localParticipant="true"
          participant={room.localParticipant}
        />
        {state.remoteParticipants.map((participant) => (
          <Participant key={participant.identity} participant={participant} />
        ))}
      </div>
      <button id="leaveRoom" onClick={leaveRoom}>
        Leave Room
      </button>
      <Footer />
    </div>
  );
};

export default Room;
