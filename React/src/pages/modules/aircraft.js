import React from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import AircraftList from "./subModules/AircraftList";

const AircraftModule = () => {
    return(
        <div className="d-flex" id="wrapper">
            <Header />
            <div id="page-content-wrapper">
                <Navbar />
                <div className="container-fluid px-4">
                    <div className="component-container">
                    <AircraftList/>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default AircraftModule;