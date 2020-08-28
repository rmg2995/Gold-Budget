import React, { Fragment, useState, useEffect } from "react";
import "../styles/navbar.scss";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Logo from "../images/image (1).png";

// import Search from "./Search/search";

const Navbar = (props) => {
  return (
    <div>
      <div className="navbar-phone">
        <Link to="/">
          <img src={Logo} alt="iron-budget-logo" className="logo" />
        </Link>

        <Menu right>
          <Link className="menu-item" to="/">
            Home
          </Link>

          <Link className="menu-item" to="/sign-up">
            Sign Up
          </Link>

          <Link className="menu-item" to="/log-in">
            Log in
          </Link>

          {/* <Link className="menu-item" to="/profile">
              Profile
            </Link> */}
          <Link className="menu-item" to="/overview">
            Overview
          </Link>
          <Link className="menu-item" to="/transactions">
            Transactions
          </Link>
          <Link className="menu-item" to="/meet-team">
            Meet The Team
          </Link>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
