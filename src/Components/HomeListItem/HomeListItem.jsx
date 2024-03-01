import React from "react";
import "./HomeListItem.css";

export default function HomeListItem({img, index, url, description }) {
  return (
    <div index={index} className="listItem">
      <a className="linkBtn" href={url}>
        <div className="icoContainer">
          <img
            src={`${process.env.PUBLIC_URL}${img}`}
            alt={`item ${index + 1}`}
          />
        </div>
        <div className="descContainer">
          <p className="descText">{description}</p>
        </div>
      </a>
    </div>
  );
}
