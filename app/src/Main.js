import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import Home from "./views/Home";
import Upload from "./views/Upload";
import Search from "./views/Search";
import About from "./views/About";

import logo from './images/logo.png'
import logo_hrai from './images/logo_hrai.png'

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <div className="header">
                        <img className="headerLogo"
                             id="topBarLogo"
                             alt="Logo"
                             src={logo_hrai}
                        />
                        <img className="header"
                             id="topBarLogo"
                             alt="Logo"
                             src={logo}
                        />
                    </div>

                    <ul className="nav">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/upload">Upload Resume</NavLink></li>
                        <li><NavLink to="/search">Search Resume</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/upload" component={Upload}/>
                        <Route path="/search" component={Search}/>
                        <Route path="/about" component={About}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;