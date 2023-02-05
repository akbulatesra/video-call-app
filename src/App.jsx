import { useState } from 'react';
import Room from './components/room';
import Lobby from './components/lobby';
import './styles.module.scss';
import { connect } from 'twilio-video';

const App = () => {
  const [state, setState] = useState({
    identity: '',
    room: null,
  });

  async function joinRoom() {
    try {
      const response = await fetch(
        `https://token-service-2-7678-dev.twil.io/token?identity=${state.identity}`
      );
      const data = await response.json();
      const room = await connect(data.accessToken, {
        name: 'cool-room',
        audio: true,
        video: true,
      });

      setState((p) => ({ ...p, room }));
    } catch (err) {
      console.log(err);
    }
  }

  function returnToLobby() {
    setState((prev) => ({ ...prev, room: null }));
  }

  function updateIdentity(event) {
    setState((prev) => ({
      ...prev,
      identity: event.target.value,
    }));
  }

  if (state.room === null) {
    return (
      <Lobby
        identity={state.identity}
        joinRoom={joinRoom}
        updateIdentity={updateIdentity}
      />
    );
  } else {
    return <Room returnToLobby={returnToLobby} room={state.room} />;
  }
};

export default App;
