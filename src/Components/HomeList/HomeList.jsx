import React from "react";
import HomeListItem from "../HomeListItem/HomeListItem";
import "./HomeList.css";

function HomeList({ links }) {
  return (
    <div className="listContainer">
      {links.map((link, index) => (
        <HomeListItem key={index} img ={link.img} url={link.url} description={link.description} />
      ))}
    </div>
  );
}

export default HomeList;
