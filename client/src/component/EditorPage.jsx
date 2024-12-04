import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "../Socket";
import {
  useParams,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import toast from "react-hot-toast";

function EditorPage() {
  const [clients, setClient] = useState([]);
  const naviagte = useNavigate();
  const location = useLocation();
  // socket connection
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const { roomId } = useParams();
  console.log(roomId);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));
      const handleError = (err) => {
        console.log("Error", err);
        toast.error("Connection failed");
        naviagte("/");
      };
      socketRef.current.emit("join", {
        roomId,
        username: location.state?.username,
      });

      // listening socket on -> how are currently joined in
      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined`);
        }
        setClient(clients);

        // display the previous code to the newly joined users
        socketRef.current.emit("sync-code", {
          code: codeRef.current,
          socketId,
        });
      });

      //listening user disconnected
      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClient((prev) => {
          return prev.filter((client) => client.socketId != socketId);
        });
      });
    };
    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
    };
  }, []);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  // copy room id
  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied");
    } catch (err) {
      toast.error("unable to copy room id");
    }
  };

  // leave room
  const leaveRoom = async () => {
    naviagte("/");
    toast.success("Room leaved");
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div
          className="col-md-2 d-flex flex-column bg-dark text-light h-100"
          style={{ boxShadow: "2px 0px 4px rgba(0,0,0,0.1)" }}
        >
          <img
            src="/images/codelogo.png"
            alt="CodeTogether"
            className="img-fluid mx-auto"
            style={{ maxWidth: "150px", marginTop: "10px" }}
          />
          <hr style={{ marginTop: "1rem" }} />
          {/* Members list section */}
          <div className="d-flex flex-column overflow-auto">
            {/* Client have to add wait  */}
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
          {/* Buttons  */}
          <div className="mt-auto">
            <hr />
            <button onClick={copyRoomId} className="btn btn-success">
              Copy Room Id
            </button>
            <button
              onClick={leaveRoom}
              className="btn btn-danger mt-2 mb-2 px-3 btn-block"
            >
              Leave Room
            </button>
          </div>
        </div>

        {/* Editor Section */}
        <div className="col-md-10 d-flex flex-column text-light h-100">
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => (codeRef.current = code)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
