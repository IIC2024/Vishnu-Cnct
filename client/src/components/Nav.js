import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { Menu } from "./Menu";
import logo1 from '../pngs/logopng.png'

class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <nav className="Navbaritems">
                    <a href="https://vishnu.edu.in/"><img src={logo1} alt=""  className="navbar-logo"/></a>
                    <div className="menu-icons">
                        <i className=""></i>
                    </div>
                    <ul>
                        {Menu.map((item, index) => (
                            <li key={index} className="li">
                                <Link className={item.cName} to={item.url}>
                                    <i className={item.icon}></i>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Nav;
