import React from "react";
import axios from "../../../api/axiosConfig";

class AircraftList extends React.Component {
    state = { DataList: [] };


    getAircrafts = async () => {
        try{
            let response = await axios.get('/aircraft');
            let { data } = response;
            this.setState({DataList:data.body.data});
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount(){
        this.getAircrafts();
    }

    render(){
        return(
            <div class="row my-5">
                <h3 class="fs-4 mb-3">Aircraft List</h3>
                <div class="col">
                    <table class="table bg-white rounded shadow-sm  table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Aircraft No</th>
                                <th scope="col">Airline</th>
                                <th scope="col">Source</th>
                                <th scope="col">Destination</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.DataList.length > 0 ?this.state.DataList.map( data =>
                                <tr key={data.aircraft_id}>
                                    <td>{data.aircraft_no}</td>
                                    <td>{data.airline}</td>
                                    <td>{data.source}</td>
                                    <td>{data.destination}</td>
                                </tr>
                            ) : <tr><td colSpan="4" style={{textAlign:'center'}}>No Data Found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AircraftList;