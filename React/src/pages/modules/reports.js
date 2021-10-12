import React from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import AirportSummaryReport from "./subModules/AirportSummaryReport";
import FuelConsumptionReport from "./subModules/FuelConsumptionReport";

class ReportsModule extends React.Component {
    render(){
        return(
            <div className="d-flex" id="wrapper">
                <Header />
                <div id="page-content-wrapper">
                    <Navbar />
                    <div className="container-fluid px-4">
                        <div className="component-container"> 
                            <div className="row">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Airport Summary Report</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Fuel Consumption Report</button>
                                </li>
                            </ul>
                            </div>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <AirportSummaryReport />
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <FuelConsumptionReport />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReportsModule;