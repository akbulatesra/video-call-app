import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import './index.css';

const Track = (props) => {
  const ref = useRef();
  const handleResize = (e) => {
    document.querySelectorAll('.max').classList?.remove('max');
    e.target.classList.add('max');
    e.target.classList.remove('min');
  };
  useEffect(() => {
    if (props.track !== null) {
      const child = props.track.attach();
      ref.current.classList.add(props.track.kind);
      ref.current.appendChild(child);
      child.classList.add('min');
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
