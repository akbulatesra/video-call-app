import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

const Track = (props) => {
  const ref = useRef();
  const handleResize = (e) => {
    document
      .getElementsByClassName(`${styles.max}`)
      .classList?.remove(`${styles.max}`);
    e.target.classList.add(`${styles.max}`);
    e.target.classList.remove(`${styles.min}`);
  };
  useEffect(() => {
    if (props.track !== null) {
      const child = props.track.attach();
      ref.current.classList.add(props.track.kind);
      ref.current.appendChild(child);
      child.classList.add(`${styles.min}`);
    }
  }, [props.track]);
  return (
    <div
      className={styles.track}
      ref={ref}
      onClick={(e) => handleResize(e)}
    ></div>
  );
};

export default Track;
