import React from "react";
import Socials from "../../consts/Socials";

import "./SocialMediaBar.css";

export default function SocialMediaBar() {
  return (
    <div className="socialBar">
      <div className="social">
        <a href={Socials.Instagram.url}>
          <img src={Socials.Instagram.ico} alt="Instagram" />
        </a>
      </div>
      <div className="social">
        <a href={Socials.X.url}>
          <img src={Socials.X.ico} alt="X" />
        </a>
      </div>
      <div className="social">
        <a href={Socials.Facebook.url}>
          <img src={Socials.Facebook.ico} alt="Facebook" />
        </a>
      </div>
      <div className="social">
        <a href={Socials.TikTok.url}>
          <img src={Socials.TikTok.ico} alt="TikTok" />
        </a>
      </div>
    </div>
  );
}
