import React from "react";
import axios from "../../../api/axiosConfig";

class AddRevTransaction extends React.Component {
    
    state = { transIdParent : '', aircraftId:'', quantity:0, aircrafts:[] };
    
    getAircrafts = async ( ) => {
        try{
            let response = await axios.get('/aircraft');
            let { data } = response;
            this.setState({aircrafts:data.body.data});
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount(){
        this.getAircrafts();
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
        let { transIdParent, aircraftId, quantity } = this.state;
        quantity = parseFloat(quantity);
        this.props.handleSubmit({transIdParent, aircraftId, quantity});
        this.setState({ transIdParent : '', aircraftId:'', quantity:0 });
    }

    render(){
        return(
            <div className="row my-5">
                <div className="col col-md-6">
                    <form onSubmit={this.handleSubmit}> 
                        <div>
                            <div className="form-group">
                                <label htmlFor="transIdParent">Parent Transaction Id </label>
                                <input type="text" className="form-control" id="transIdParent" 
                                    name="transIdParent" aria-describedby="emailHelp"
                                    value={this.state.transIdParent} placeholder="Enter Parent Transaction Id"
                                    onChange={this.handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="aircraftId">Aircraft</label>
                                <select className="form-control" id="aircraftId" 
                                    name="aircraftId" aria-describedby="emailHelp" 
                                    value={this.state.aircraftId} placeholder="Enter Aircraft"
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
                                    value={this.state.quantity} placeholder="Enter quantity" 
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

export default AddRevTransaction;