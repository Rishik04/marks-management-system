import React from "react";

const MainHeader = () => {
  return (
    <div className="main-header">
      <div className="header-left">
        <div className="left-logo">
          <div className="left-logo-container">
            <img src="/assets/images/logo.jpg" alt="" />
            <img src="/assets/images/uni.jpeg" alt="" />
          </div>
        </div>
      </div>
      <div className="header-center">
        <h2>ASANSOL ENGINEERING COLLEGE</h2>
      </div>
      <div className="header-right">
        <div className="right-logo">
          <div className="right-logo-container">
            <img src="/assets/images/jis.jpg" alt="" />
            <img src="/assets/images/tg.png" alt="" />
          </div>
          <h4>A JOINT VENTURE COLLEGE</h4>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
