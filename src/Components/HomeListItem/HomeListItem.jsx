import React from "react";
import "./HomeListItem.css";

export default function HomeListItem({ img, index, url, description }) {
  return (
    <div index={index} className="listItem">
      <a className="linkBtn" href={url}>
        <div className="icoContainer">
          <img src={img} alt={`item ${index + 1}`} />
        </div>
        <div className="descContainer">
          <p className="descText">{description}</p>
        </div>
      </a>
      <div className="bottom_border_container">
        <div
          className="bottom_border"
          style={{
            backgroundColor:
              url === "https://agents.ethoslife.com/invite/47a9b"
                ? "#074746"
                : "",
          }}
        />
      </div>
    </div>
  );
}
