import {useState , useEffect} from "react";
import {socket} from "../socket";

function Chat ({room}) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
    if (!message) return;

    socket.emit("send-message", room, message);

    // add own message locally
    setMessages((prev) => [
      ...prev,
      { message, sender: socket.id, time: new Date().toLocaleTimeString() },
    ]);

    setMessage("");
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

 return (
  <div style={{ maxWidth: "500px", margin: "auto" }}>
    <h2>Room: {room}</h2>

    <div style={{
      height: "300px",
      overflowY: "scroll",
      border: "1px solid #ddd",
      padding: "10px"
    }}>
      {messages.map((msg, index) => (
        <div key={index} style={{
            margin: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px"
        }}>
          <strong>{msg.sender === socket.id ? "You" : msg.sender}</strong>
          <p>{msg.message}</p>
          <small>{msg.time}</small>
        </div>
      ))}
    </div>

    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      style={{ width: "70%" }}
    />
    <button onClick={sendMessage}>Send</button>
  </div>
);
}

export default Chat;