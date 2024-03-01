import React from "react";
import "./Home.css";
import HomeList from "../../Components/HomeList/HomeList";
import SocialMediaBar from "../../Components/SocialMedia/SocialMediaBar.jsx";
import data from "../../consts/Links";
import bio from "../../consts/BioMessage";
import { PFP, Footer } from "../../assets";

function Home() {
  return (
    <div className="appContainer">
    <div className="app">
      <p className="bio">{`${bio.message}`}</p>
      <h1 className="name">Kay Lynn West</h1>
      <div className="pfp-container">
        <img
          className="pfp"
          src={PFP}
          alt="Kay Lynn West"
        />
      </div>

      
      <SocialMediaBar />

      
      <HomeList links={data.Links} />

      <div className="footerImg">
        <img
          src={Footer}
          alt="Kay Lynn West"
        />
      </div>
    </div>
    
    </div>
  );
}

export default Home;
