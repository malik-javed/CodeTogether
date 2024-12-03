import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function Home() {
  // const URL = import.meta.env.VITE_BACKEND_URL;
  // console.log(URL);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // -----Generate Room Id-----
  const generateRoomId = (e) => {
    e.preventDefault();
    const uniqueId = uuidv4();
    // console.log(uniqueId);
    setRoomId(uniqueId);
    // console.log("clicked");
    toast.success("Room Id is generated");
  };

  // -----Join Room Handle Listener-----
  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required");
      return;
    }
    // navigate
    navigate(`/editor/${roomId}`, {
      state: { username },
    });
    toast.success("Room is created");
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-2 mb-5 bg-secondary rounded">
            <div className="card-body text-center bg-dark">
              <img
                className="img-fluid mx-auto d-block"
                src="images/codelogo.png"
                alt="CodeTogether"
                style={{ maxWidth: "150px" }}
              />
              <h4 className="text-light">Enter Room ID</h4>
              <div className="form-group">
                <input
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  type="text"
                  className="form-control mb-2"
                  placeholder="Room ID"
                />
              </div>
              <div className="form-group">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                />
              </div>
              <button
                onClick={joinRoom}
                className="btn btn-success btn-lg btn-block"
              >
                JOIN
              </button>
              <p className="text-light mt-3">
                Don't have a room Id?{" "}
                <span
                  className="text-success p-2"
                  style={{ cursor: "pointer" }}
                  onClick={generateRoomId}
                >
                  New Room
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
