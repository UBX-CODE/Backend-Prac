import{useState} from "react";
import{socket} from "../socket";

function JoinRoom({setRoom}){
    const[roomInput, setRoomInput] = useState("");

    const joinRoom = () =>{
        if(!roomInput) return;

        socket.emit("join-room", roomInput);
        setRoom(roomInput);
    };

    return(
        <div>

            <h2>Join Room</h2>
            <input
            type="text"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            placeholder="Enter room name"
            />
            <button onClick={joinRoom}>Join Room</button>
        </div>
    );
}

export default JoinRoom;