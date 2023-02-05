import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Participant from '../participant';
import Footer from '../footer';

const Room = (props) => {
  const [remoteParticipants, setRemoteParticipants] = useState(
    Array.from(props.room.participants.values())
  );
  useEffect(() => {
    setRemoteParticipants(Array.from(props.room.participants.values()));
  }, [props.room.participants]);

  useEffect(() => {
    // Add event listeners for future remote participants coming or going
    props.room.on('participantConnected', (participant) =>
      addParticipant(participant)
    );
    props.room.on('participantDisconnected', (participant) =>
      removeParticipant(participant)
    );
    window.addEventListener('beforeunload', leaveRoom);

    return () => {
      props.room.off('participantConnected', (participant) =>
        addParticipant(participant)
      );
      props.room.off('participantDisconnected', (participant) =>
        removeParticipant(participant)
      );
      window.removeEventListener('beforeunload', leaveRoom);
    };
  }, []);

  const addParticipant = (participant) => {
    console.log(`${participant.identity} has joined the room.`);
    setRemoteParticipants([...remoteParticipants, participant]);
  };

  const removeParticipant = (participant) => {
    console.log(`${participant.identity} has left the room`);
    setRemoteParticipants(
      remoteParticipants.filter((p) => {
        return p.identity !== participant.identity;
      })
    );
  };

  const leaveRoom = () => {
    props.room.disconnect();
    props.returnToLobby();
  };
  return (
    <div className={styles.room}>
      <div className={styles.participants}>
        <Participant
          key={props.room.localParticipant.identity}
          localParticipant="true"
          participant={props.room.localParticipant}
        />
        {remoteParticipants.map((participant) => (
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
