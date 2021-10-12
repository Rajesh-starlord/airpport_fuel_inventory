import React from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import AirportList from "./subModules/AirportList";

const AirportModule = () => {
    return(
        <div className="d-flex" id="wrapper">
            <Header />
            <div id="page-content-wrapper">
                <Navbar />
                <div className="container-fluid px-4">
                    <div className="component-container">
                    <AirportList/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AirportModule;