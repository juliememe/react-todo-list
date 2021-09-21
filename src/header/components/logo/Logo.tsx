import React from "react";
import { Link } from "react-router-dom";
import "./logo.scss";

function Logo() {
  return (
    <Link to="/" className={"logo"}>
      To-Do List
    </Link>
  );
}
export default Logo;
