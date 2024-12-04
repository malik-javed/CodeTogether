import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";

function Editor({ socketRef, roomId }) {
  const editorRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        (editorRef.current = document.getElementById("realTimeEditor")),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          lineNumbers: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
        }
      );
      editor.setSize(null, "100%");

      // code sync -> real time reflect code changes
      editor.on("change", (instance, changes) => {
        const { origin } = changes; // from the changes takes place -> input , paste , delete
        const code = instance.getValue(); // get the current code
        // console.log(updatedcode);
        if (origin !== "setValue") {
          socketRef.current.emit("code-change", {
            roomId,
            code,
          });
        }
      });
    };
    init();
  }, []);

  return (
    <div style={{ height: "600px" }}>
      <textarea id="realTimeEditor"></textarea>
    </div>
  );
}

export default Editor;
