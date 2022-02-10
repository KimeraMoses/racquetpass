import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./home";
import Login from "./login";
import Page404 from "./page-404";

function Routers() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default Routers