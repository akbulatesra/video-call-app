import { useState } from 'react';
import Room from './components/room';
import Lobby from './components/lobby';
import './styles.module.scss';

const App = () => {
  const [room, setRoom] = useState(null);

  const returnToLobby = () => {
    setRoom(null);
  };

  if (room === null) {
    return <Lobby setRoom={setRoom} />;
  } else {
    return <Room returnToLobby={returnToLobby} room={room} />;
  }
};

export default App;
