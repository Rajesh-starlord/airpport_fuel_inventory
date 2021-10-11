import React from "react";
import { useAlert } from "react-alert";

import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import AddAircraft from "./subModules/AddAircraft";
import AddAirport from "./subModules/AddAirport";
import axios from "../../api/axiosConfig";

const InitializeModule = () => {
    const alert = useAlert();
    const saveAirport = data => {
        console.log(data);
        console.log('add airport');
        axios.post('/airport/add',{...data}).then(resp=>{
            console.log(resp);
            alert.show('success')
        }).catch(err=>{
            console.log('failed',err);
            alert.show('failed');
        })
    
    }

    const saveAircraft = (data) => {
        console.log(data);
        console.log('add aircraft');
        axios.post('/aircraft/add',{...data}).then(resp=>{
            console.log(resp);
            let response = resp.data;
            if(response.status === 'SUCCESS'){
                alert.show('Success');
            }else{
                alert.show('Failed');
            }
        }).catch(err=>{
            console.log('failed',err);
            alert.show('failed')
        })
    }

    const deleteAllTrans = () => {
        axios.post('/transactions/deleteAll').then(resp=>{
            console.log(resp);
            let response = resp.data;
            if(response.status === 'SUCCESS'){
                alert.show('Success');
            }else{
                alert.show('Failed');
            }
        }).catch(err=>{
            console.log('failed',err);
            alert.show('failed');
        })
    }

    return(
        <div className="d-flex" id="wrapper">
            <Header />
            <div id="page-content-wrapper">
                <Navbar />
                <div className="container-fluid px-4">
                    <div className="row">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">AddAirport</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">AddAircraft</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Delete Transaction</button>
                        </li>
                    </ul>
                    </div>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <AddAirport handleSubmit={saveAirport}/>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <AddAircraft handleSubmit={saveAircraft}/>
                        </div>
                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            Do Yo Want To Delete All Transaction?? <button type="button" className="btn btn-success" value="Delete" onClick={deleteAllTrans}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default InitializeModule;