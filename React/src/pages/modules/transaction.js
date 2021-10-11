import React from "react";
import { useAlert } from "react-alert";

import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import axios from "../../api/axiosConfig";
import AddTransaction from "./subModules/AddTransaction";
import AddRevTransaction from "./subModules/AddRevTransaction";

const TransactionModule = () => {
    const alert = useAlert();
    const saveTransaction = data => {
        console.log(data);
        console.log('add transaction');
        axios.post('/transactions/addTrans',data).then(resp=>{
            console.log(resp);
            let response = resp.data;
            if(response.status === 'SUCCESS'){
                alert.show('Success');
            }else{
                alert.show('Failed');
            }
        }).catch(err=>{
            console.log('failed');
            alert.show('failed');
        });
    }
    const saveRevTransaction = (data) => {
        console.log(data);
        console.log('add reverse transaction');
        axios.post('/transactions/addReverseTransaction',data).then(resp=>{
            console.log(resp);
            let response = resp.data;
            if(response.status === 'SUCCESS'){
                alert.show('Success');
            }else{
                alert.show('Failed');
            }
        }).catch(err=>{
            console.log('failed');
            alert.show('failed')
        });
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
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Add Transaction</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Add Reverse Transaction</button>
                        </li>
                    </ul>
                    </div>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <AddTransaction handleSubmit={saveTransaction}/>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <AddRevTransaction handleSubmit={saveRevTransaction}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default TransactionModule;