import React from "react";
import axios from "../api/axiosConfig";
import '../css/login.css';

class Login extends React.Component {
    state = { userid: '', password: '' , isError:false };

    onEmailChange = event => {
        this.setState({ userid: event.target.value });
    }

    onPasswordChange = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        let {userid, password} = this.state;
        if(userid === '' || userid === null || userid === undefined){
            this.setState({isError:true, error:'UserId can not ne blank!'});
        }else if(password === '' || password === null || password === undefined){
            this.setState({isError:true, error:'Password can not ne blank!'});
        }
        if(!this.state.isError){
            axios.post('/login',{userid, password}).then(resp=>{
                let userData = resp.data.body;
                if(resp.data.status === 'SUCCESS'){
                    console.log('User Found!');
                    localStorage.setItem('isAuthenticated',true);
                    localStorage.setItem('user', userData);
                    localStorage.setItem('Token',userData.token);
                    window.location.href='/admin';
                }else{
                    console.log('User Not Found!');
                    this.setState({isError:true, error:'User Not Found!'});
                }
            }).catch(err=>{
                console.log('failed',err);
                this.setState({isError:true, error:'Login Failed!'});
            })   
        }
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                <div className="fadeIn first" style={{marginTop:'10px'}}>
                    Login
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group myinput">
                        <input type="text" className="form-control" id="airportName" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter UserId"
                            name="userid" value={this.state.email} onChange={this.onEmailChange} />
                    </div>
                    <div className="form-group myinput">
                        <input type="password" className="form-control" id="airportName" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter Password"
                            name="password" value={this.state.password} onChange={this.onPasswordChange} />
                    </div>
                    <input type="submit" class="fadeIn fourth" value="Log In"/>
                </form>
                <div className={`ui error message ${!this.state.isError ? 'hide' : ''}`}>{this.state.error}</div>
            </div>
        </div>
        )
    }
}

export default Login;