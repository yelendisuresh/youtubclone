import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  if (isMenuOpen) {
    return null;
  }

  return (
    <div className="p-5 shadow-lg w-48 ">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
        <li>Cricket</li>
      </ul>
      <h1 className="font-bold"> Subscription</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
        <li>Cricket</li>
      </ul>
      <h1 className="font-bold py-5"> Watch later</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
        <li>Cricket</li>
      </ul>
    </div>
  );
};

export default Sidebar;
