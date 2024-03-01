import React from "react";
import "./Home.css";
import HomeList from "../../Components/HomeList/HomeList";
import data from "../../consts/Links";
import bio from "../../consts/BioMessage";

function Home() {
  return (
    <div className="appContainer">
    <div className="app">
      <p className="bio">{`${bio.message}`}</p>
      <h1 className="name">Kay Lynn West</h1>
      <div className="pfp-container">
        <img
          className="pfp"
          src={`${process.env.PUBLIC_URL}/assets/PFP-KLW.jpg`}
          alt="Kay Lynn West"
        />
      </div>
      <HomeList links={data.Links} />

      <div className="footerImg">
        <img
          src={`${process.env.PUBLIC_URL}/assets/elegantFooter.png`}
          alt="Kay Lynn West"
        />
      </div>
    </div>
    
    </div>
  );
}

export default Home;
