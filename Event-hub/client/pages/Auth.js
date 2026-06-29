import { useState } from "react";
import axios from "axios";

function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    const url = isLogin
      ? "http://localhost:3000/auth/login"
      : "http://localhost:3000/auth/signup";

    const response = await axios.post(url, formData);

    if (response.data.token) {
      localStorage.setItem(
        "token",
        response.data.token
      );
    }
    alert(response.data.message);
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Signup"}</h2>

      {!isLogin && (
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
      )}

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        Submit
      </button>

      <button
        onClick={() =>
          setIsLogin(!isLogin)
        }
      >
        Switch to {isLogin ? "Signup" : "Login"}
      </button>
    </div>
  );
}

export default Auth;