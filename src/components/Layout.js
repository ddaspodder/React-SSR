import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <header>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about-us">AboutUs</NavLink>
          </li>
          <li>
            <NavLink to="/product/p123?testting=test">
              Product
            </NavLink>
          </li>
        </ul>
      </header>
      <Outlet />
      <footer>Footer</footer>
    </>
  );
};

export default Layout;
