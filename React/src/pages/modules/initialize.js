import React from "react";
//import { useAlert } from "react-alert";
import swal from 'sweetalert2';

import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import AddAircraft from "./subModules/AddAircraft";
import AddAirport from "./subModules/AddAirport";
import axios from "../../api/axiosConfig";

const InitializeModule = () => {
    //const alert = useAlert();
    const saveAirport = data => {
        swal.showLoading();
        axios.post('/airport/add', { ...data }).then(resp => {
            let response = resp.data;
            if (response.status === 'SUCCESS') {
                //alert.show('Success');
                swal.close();
                swal.fire({
                    title: 'Success',
                    text: 'New Airport Added',
                    icon: 'success',
                    confirmButtonText: 'cancel'
                })
            } else {
                //alert.show('Failed');
                swal.close();
                swal.fire({
                    title: 'Failed',
                    text: 'Oops ! something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'cancel'
                })
            }
        }).catch(err => {
            console.log('failed', err);
            swal.close();
            //alert.show('failed');
            swal.fire({
                title: 'Failed',
                text: 'Oops ! something went wrong!',
                icon: 'error',
                confirmButtonText: 'cancel'
            })
        })

    }

    const saveAircraft = (data) => {
        swal.showLoading();
        axios.post('/aircraft/add', { ...data }).then(resp => {
            console.log(resp);
            let response = resp.data;
            if (response.status === 'SUCCESS') {
                //alert.show('Success');
                swal.close();
                swal.fire({
                    title: 'Success',
                    text: 'New Aircraft Added',
                    icon: 'success',
                    confirmButtonText: 'cancel'
                })
            } else {
                //alert.show('Failed');
                swal.close();
                swal.fire({
                    title: 'Failed',
                    text: 'Oops ! something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'cancel'
                })
            }
        }).catch(err => {
            console.log('failed', err);
            //alert.show('failed')
            swal.close();
            swal.fire({
                title: 'Failed',
                text: 'Oops ! something went wrong!',
                icon: 'error',
                confirmButtonText: 'cancel'
            })
        })
    }

    const deleteAllTrans = () => {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                swal.showLoading();
                axios.post('/transactions/deleteAll').then(resp => {
                    console.log(resp);
                    let response = resp.data;
                    if (response.status === 'SUCCESS') {
                        //alert.show('Success');
                        swal.close();
                        swal.fire({
                            title: 'Success',
                            text: 'All transactions deleted successfully.',
                            icon: 'success',
                            confirmButtonText: 'cancel'
                        })
                    } else {
                        //alert.show('Failed');
                        swal.close();
                        swal.fire({
                            title: 'Failed',
                            text: 'Oops ! something went wrong!',
                            icon: 'error',
                            confirmButtonText: 'cancel'
                        })
                    }
                }).catch(err => {
                    console.log('failed', err);
                    //alert.show('failed');
                    swal.close();
                    swal.fire({
                        title: 'Failed',
                        text: 'Oops ! something went wrong!',
                        icon: 'error',
                        confirmButtonText: 'cancel'
                    })
                })
            }
        })
    }

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
        </div>
    );
    
}

export default InitializeModule;