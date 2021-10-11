import React from "react";
import axios from "../../../api/axiosConfig";

class AirportSummaryReport extends React.Component {
    state = { DataList: [] };

    getAirportSummaryReport = async () => {
        try{
            let response = await axios.get('/reports/airportSummaryReport');
            let { data } = response;
            this.setState({DataList:data.body.data});
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount(){
        this.getAirportSummaryReport();
    }

    render(){
        return(
            <div className="row my-5">
                <h3 class="fs-4 mb-3">Airport Summary Report</h3>
                <div class="col">
                    <table class="table bg-white rounded shadow-sm  table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Airport</th>
                                <th scope="col">Fuel Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.DataList.length > 0 ? this.state.DataList.map( data => 
                                <tr key={data.airport_id}>
                                    <td>{data.airport_name}</td>
                                    <td>{data.fuel_available}</td>
                                </tr> 
                            ) : <tr key="0"><td colSpan="2" style={{textAlign:'center'}}>No Data Found</td></tr> }                        
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AirportSummaryReport;