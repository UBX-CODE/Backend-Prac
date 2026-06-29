import { useState } from "react";
import JoinRoom from "./components/JoinRoom";
import Chat from "./components/Chat";

function App() {
  const [room, setRoom] = useState("");

  return (
    <div>
      <h1>Chat App</h1>
      {!room ? (
        <JoinRoom setRoom={setRoom} />
      ) : (
        <Chat room={room} />
      )}
    </div>
  );
}

export default App;