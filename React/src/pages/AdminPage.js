import React from "react";
import Header from '../components/Header';
import Navbar from '../components/Navbar';

class AdminPage extends  React.Component {
    render(){
        return (
            <div className="d-flex" id="wrapper">
                <Header />
                <div id="page-content-wrapper">
                    <Navbar />
                    <div className="container-fluid px-4">
                        Admin Dashboard
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPage;