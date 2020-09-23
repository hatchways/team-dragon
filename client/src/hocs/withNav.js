import React from "react";
import NavBar from "../components/NavBar";

const withNav = (Component) => {
  return (props) => (
    <>
      <NavBar />
      <Component {...props} />
    </>
  );
};

export default withNav;
