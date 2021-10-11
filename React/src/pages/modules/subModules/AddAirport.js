import React from "react";

class AddAirport extends React.Component {
    
    state = { airportName : '', fuelCapacity: 0, fuelAvailable:0 };
    
    handleChange = event => {
        let value = event.target.value;
        let key = event.target.name;
        let newState = {};
        newState[key] = value;
        this.setState(newState);
    }
    reset = () => {
        this.setState({ airportName : '', fuelCapacity: 0, fuelAvailable:0 });
    }
    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        let data = this.state
        this.props.handleSubmit(data)
        this.reset()
    }

    render(){
        return(
            <div className="row my-8">
                <div className="col col-md-6">
                    <form className="needs-validation" onSubmit={this.handleSubmit}> 
                        <div>
                            <div className="form-group">
                                <label htmlFor="airportName" className="form-label">Airport Name</label>
                                <input type="text" className="form-control" id="airportName" 
                                    name="airportName" aria-describedby="emailHelp" 
                                    value={this.state.airportName} placeholder="Enter Airport"
                                    onChange={this.handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fuelCapacity">Fueal Capacity</label>
                                <input type="number" className="form-control" id="fuelCapacity" 
                                    name="fuelCapacity" aria-describedby="emailHelp" 
                                    value={this.state.fuelCapacity} placeholder="Enter Airport" 
                                    onChange={this.handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fuelAvailable">Fuel Available</label>
                                <input type="number" className="form-control" id="fuelAvailable" 
                                    name="fuelAvailable" aria-describedby="emailHelp" 
                                    value={this.state.fuelAvailable} placeholder="Enter Airport" 
                                    onChange={this.handleChange} />
                            </div>

                            <div className="form-group form-check">
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="reset" className="btn btn-success" onClick={this.reset}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddAirport;