import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Track from '../track';

const Participant = (props) => {
  const existingPublications = Array.from(
    this.props.participant.tracks.values()
  );
  const existingTracks = existingPublications.map(
    (publication) => publication.track
  );
  const nonNullTracks = existingTracks.filter((track) => track !== null);

  const [state, setState] = useState({
    tracks: nonNullTracks,
  });

  useEffect(() => {
    if (!props.localParticipant) {
      props.participant.on('trackSubscribed', (track) => addTrack(track));
    }
  }, [props.localParticipant, props.participant]);

  function addTrack(track) {
    setState((prev) => ({
      ...prev,
      tracks: [...prev.tracks, track],
    }));
  }

  return (
    <div className={styles.participant} id={props.participant.identity}>
      <div className={styles.identity}>{props.participant.identity}</div>
      {state.tracks.map((track) => (
        <Track key={track} track={track} />
      ))}
    </div>
  );
};

export default Participant;
