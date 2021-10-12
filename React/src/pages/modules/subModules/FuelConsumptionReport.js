import React from "react";
import { transitions } from "react-alert";
import axios from "../../../api/axiosConfig";

class FuelConsumptionReport extends React.Component {
    state = { DataList: [] };

    getFuelConsumptionReport = async () => {
        try{
            let response = await axios.get('/reports/fuelCosumptionReport');
            let { data } = response;
            this.setState({DataList:data.body.data});
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount(){
        this.getFuelConsumptionReport();
    }
    
    render(){
        return(
            <div className="row my-5">
                <h3 className="fs-4 mb-3">Fuel Consumption Report</h3>
                <div className="col">
                    { this.state.DataList.length > 0 ?  this.state.DataList.map(data=> 
                        <div>
                            <div>
                                <div className="report-head" style={{textAlign: 'center',marginLeft: '2px',background: 'wheat',marginBottom: '5px',height: '30px'}} key={data.airport_id}>AIRPORT: {data.airport_name}</div>
                            </div>
                            <table className="table bg-white rounded shadow-sm  table-hover ">
                            <thead>
                                <tr>
                                    <th scope="col">Date/Time</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Qyantity</th>
                                    <th scope="col">Aircraft</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.transactions.length > 0 ? data.transactions.map(trans =>
                                    <tr key={trans.transaction_id}>
                                        <td>{trans.transaction_date_time}</td>
                                        <td>{trans.transaction_type}</td>
                                        <td>{trans.quantity}</td>
                                        <td>{trans.aircraft_no}</td>
                                    </tr>
                                ):  <tr><td colSpan="4" style={{textAlign:'center'}}>No Transactions Found</td></tr>}
                            </tbody>
                        </table>
                        </div>
                    ): <div className="row" style={{textAlign:'center'}}>No Data Found</div>}
                </div>
            </div>
        )
    }
}

export default FuelConsumptionReport;