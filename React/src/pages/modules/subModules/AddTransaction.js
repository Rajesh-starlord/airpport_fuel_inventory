import React from "react";
import axios from "../../../api/axiosConfig";

class AddTransaction extends React.Component {
    
    state = { airportId : '', transactionType: '', aircraftId:'', quantity:0, aircrafts:[], airports:[]};
    
    getAircrafts = async ( ) => {
        try{
            let response = await axios.get('/aircraft');
            let { data } = response;
            this.setState({aircrafts:data.body.data});
        }catch(e){
            console.log(e);
        }
    }

    getAirports = async ( ) => {
        try{
            let response = await axios.get('/airport');
            let { data } = response;
            this.setState({airports:data.body.data});
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount(){
        this.getAircrafts();
        this.getAirports();
    }

    handleChange = event => {
        let value = event.target.value;
        let key = event.target.name;
        let newState = {};
        newState[key] = value;
        this.setState(newState);
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        let {airportId, transactionType, aircraftId, quantity } = this.state;
        quantity = parseFloat(quantity);
        this.props.handleSubmit({airportId, transactionType, aircraftId, quantity });
        this.setState({ airportId : '', transactionType: '', aircraftId:'', quantity:0 });
    }

    render(){
        return(
            <div className="row my-5">
                <div className="col col-md-6">
                    <form onSubmit={this.handleSubmit}> 
                        <div>
                            <div className="form-group">
                                <label htmlFor="airportId">Airport</label>
                                <select className="form-control" id="transactionType" 
                                    name="airportId" aria-describedby="emailHelp" 
                                    value={this.state.airportId} placeholder="Enter Airport"
                                    onChange={this.handleChange} required>
                                        <option value="">---select---</option>
                                        {
                                            this.state.airports.map(a=>
                                                <option value={a.airport_id}>{a.airport_name}</option>
                                            )
                                        }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="transactionType">Transaction Type</label>
                                <select className="form-control" id="transactionType" 
                                    name="transactionType" aria-describedby="emailHelp" 
                                    value={this.state.transactionType} placeholder="Enter Airport" 
                                    onChange={this.handleChange} required>
                                        <option value="">---select---</option>
                                        <option value="IN">IN</option>
                                        <option value="OUT">OUT</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="aircraftId">Aircraft</label>
                                <select className="form-control" id="aircraftId" 
                                    name="aircraftId" aria-describedby="emailHelp" 
                                    value={this.state.aircraftId} placeholder="Enter Airport"
                                    onChange={this.handleChange} >
                                        <option value="">---select---</option>
                                        {
                                            this.state.aircrafts.map(a=>
                                                <option value={a.aircraft_id}>{a.aircraft_no}</option>
                                            )
                                        }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input type="number" className="form-control" id="quantity" 
                                    name="quantity" aria-describedby="emailHelp" 
                                    value={this.state.quantity} placeholder="Enter Airport" 
                                    onChange={this.handleChange} required/>
                            </div>

                            <div className="form-group form-check">
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="reset" className="btn btn-success">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddTransaction;