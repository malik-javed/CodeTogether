import React, { useState } from "react";
import Client from "./Client";
import Editor from "./Editor";

function EditorPage() {
  const [clients, setClient] = useState([
    { socketId: 1, username: "Malik" },
    { socketId: 2, username: "Owais" },
  ]);
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
            <button className="btn btn-success">Copy Room Id</button>
            <button className="btn btn-danger mt-2 mb-2 px-3 btn-block">
              Leave Room
            </button>
          </div>
        </div>

        {/* Editor Section */}
        <div className="col-md-10 d-flex flex-column text-light h-100">
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
