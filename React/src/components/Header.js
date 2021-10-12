import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="bg-white" id="sidebar-wrapper">
            <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i className="fas fa-user-secret me-2" /></div>
            <div className="list-group list-group-flush my-3">
                <Link to="/admin" className="list-group-item list-group-item-action bg-transparent second-text active"><i className="fas fa-tachometer-alt me-2" />Dashboard</Link>
                <Link to='/admin/initialize' className="list-group-item list-group-item-action bg-transparent second-text fw-bold" >
                    <i className="fas fa-play-circle" />Initialize
                </Link>
                <Link to='/admin/airport' className="list-group-item list-group-item-action bg-transparent second-text fw-bold" >
                    <i className="fas fa-plane" /> Airport
                </Link>
                <Link to='/admin/aircraft' className="list-group-item list-group-item-action bg-transparent second-text fw-bold" >
                <i className="fas fa-fighter-jet"></i>Aircraft
                </Link>
                <Link to='/admin/transaction' className="list-group-item list-group-item-action bg-transparent second-text fw-bold" >
                    <i className="fas fa-dollar-sign" />Transaction
                </Link>
                <Link to='/admin/reports' className="list-group-item list-group-item-action bg-transparent second-text fw-bold" >
                    <i className="fas fa-file" />Reports
                </Link>
            </div>
        </div>
    );
}

export default Header;