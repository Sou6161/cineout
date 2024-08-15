import React from "react";
import Header from "./Header";

const ComingSoonPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden ">
      <Header />
      <div className="terminal-loader top-[20vh]">
        <div className="terminal-header">
          <div className="terminal-title">Status</div>
          <div className="terminal-controls">
            <div className="control close"></div>
            <div className="control minimize"></div>
            <div className="control maximize"></div>
          </div>
        </div>
        <div className="text">ComingSoon...</div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
