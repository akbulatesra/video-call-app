import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

const Track = (props) => {
  const ref = useRef();
  useEffect(() => {
    if (props.track !== null) {
      const child = props.track.attach();
      ref.current.classList.add(props.track.kind);
      ref.current.appendChild(child);
    }
  }, []);
  return <div className="track" ref={ref}></div>;
};

export default Track;
