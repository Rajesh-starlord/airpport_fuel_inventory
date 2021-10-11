import React from "react";

class AddAircraft extends React.Component {
    
    state = { aircraftNo : '', airline : '', source: '', destination: '' };
    
    handleChange = event => {
        let value = event.target.value;
        let key = event.target.name;
        let newState = {};
        newState[key] = value;
        this.setState(newState);
    }

    reset = () => {
        this.setState({ aircraftNo : '', airline : '', source: '', destination: '' });
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
            <div className="row my-5">
                <div className="col col-md-6">
                    <form onSubmit={this.handleSubmit}> 
                        <div>
                            <div className="form-group">
                                <label htmlFor="aircraftNo">Aircraft Number</label>
                                <input type="text" className="form-control" id="aircraftNo" 
                                    name="aircraftNo" aria-describedby="emailHelp" 
                                    value={this.state.aircraftNo} placeholder="Enter Airport"
                                    onChange={this.handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="airline">Airline</label>
                                <input type="text" className="form-control" id="airline" 
                                    name="airline" aria-describedby="emailHelp" 
                                    value={this.state.airline} placeholder="Enter Airport" 
                                    onChange={this.handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="source">Source</label>
                                <input type="text" className="form-control" id="source" 
                                    name="source" aria-describedby="emailHelp" 
                                    value={this.state.source} placeholder="Enter Airport" 
                                    onChange={this.handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="destination">Destination</label>
                                <input type="text" className="form-control" id="destination" 
                                    name="destination" aria-describedby="emailHelp" 
                                    value={this.state.destination} placeholder="Enter Airport" 
                                    onChange={this.handleChange} required/>
                            </div>

                            <div className="form-group form-check">
                            </div>
                            <button type="submit" className="btn btn-primary" style={{margin: '5px'}}>Submit</button>
                            <button type="reset" className="btn btn-success" onClick={this.reset}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddAircraft;