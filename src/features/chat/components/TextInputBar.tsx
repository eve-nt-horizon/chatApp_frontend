import React, { useState } from "react";

import { sendMessage } from "../../../api/socketio-client";

const TextInputBar = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            sendMessage(text);
          }
        }}
      ></input>
      <button
        onClick={() => {
          sendMessage(text);
        }}
      >
        Hello
      </button>
    </div>
  );
};

export default TextInputBar;
