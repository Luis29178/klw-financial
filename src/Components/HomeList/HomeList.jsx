import React from "react";
import HomeListItem from "./HomeListItem";

function HomeList({ links }) {
  return (
    <ul>
      {links.map((link, index) => (
        <HomeListItem key={index} url={link.url} description={link.description} />
      ))}
    </ul>
  );
}

export default HomeList;
