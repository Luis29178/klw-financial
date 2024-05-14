import React from "react";

function MessageGen({ line1, line2, line3 }) {
  return (
    <>
      <div className="message-container">
        <div className="message"> {line1}</div>

        <div className="message delayed"> {line2}</div>
        <div className="message delayed delayed"> {line3}</div>
      </div>
    </>
  );
}

export default MessageGen;
