import React from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import App from './App';
import Login from './views/account/login/Login';
import {getStorage} from './libs/storage';
import NotFound from './views/error/404'
export default class Page extends React.Component{
    constructor(props){
        super(props);
        this.state={
            login:false
        }
    }
    componentDidMount(){
        if(getStorage('userInfo')!==null){
            this.setState({
                login:true
            })
        }
    }
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" render={() => this.state.login?<Redirect to={"/app"}/>:<Redirect to={"/login"}/>}/>
                    <Route path="/app" component={App}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/404" component={NotFound}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}
