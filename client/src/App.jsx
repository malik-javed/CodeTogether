import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import EditorPage from "./component/EditorPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomID" element={<EditorPage />} />
      </Routes>
    </>
  );
}

export default App;
