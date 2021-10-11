import React from "react";
import axios from "../../../api/axiosConfig";

class AirportList extends React.Component {
    state = { DataList: [] };

    getAirports = async () => {
        try{
            let response = await axios.get('/airport');
            let { data } = response;
            this.setState({DataList:data.body.data});
            console.log(this.state);
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount(){
        this.getAirports();
    }

    render(){
        return(
            <div class="row my-5">
                <h3 class="fs-4 mb-3">Airport List</h3>
                <div class="col">
                    <table class="table bg-white rounded shadow-sm  table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Airport Name</th>
                                <th scope="col">Fuel Capacity</th>
                                <th scope="col">Fuel Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.DataList.length > 0 ? this.state.DataList.map( data => 
                                <tr key={data.airport_id}>
                                    <td>{data.airport_name}</td>
                                    <td>{data.fuel_capacity}</td>
                                    <td>{data.fuel_available}</td>
                                </tr>
                            ) : <tr><td colSpan="3" style={{textAlign:'center'}}>No Data Found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AirportList;