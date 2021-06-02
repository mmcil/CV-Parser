import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import Home from "./views/Home";
import Upload from "./views/Upload";
import Search from "./views/Search";
import Stuff from "./views/Stuff";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Analyze CV</h1>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/upload">Upload File</NavLink></li>
                        <li><NavLink to="/search">Search CV</NavLink></li>
                        <li><NavLink to="/stuff">Stuff</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/upload" component={Upload}/>
                        <Route path="/search" component={Search}/>
                        <Route path="/stuff" component={Stuff}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;