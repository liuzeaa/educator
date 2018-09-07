import React from 'react';
import Loadable from 'react-loadable'
import {Route,Switch} from 'react-router-dom';
import {initRouter} from '../libs/util';
const loadable = (filename) => Loadable({
    loader:() => import(`../views/${filename}`),
    loading:() => ('')
});
export default  class Routes extends React.Component{
    constructor(props){
        super(props);
        this.state={
            routes: []
        }
    }
    componentWillMount(){
        initRouter().then(res=>{
            const routes=[];
            res.forEach(function(item){
                if(item.children.length>1){
                    item.children.forEach(obj=>{
                        routes.push(obj)
                    })
                }else{
                    routes.push(item)
                }
            })
            this.setState({
                routes:routes
            })
        })
    }
    render(){
        const routes  = this.state.routes;
        return(
            <Switch>
                {
                    routes.map(r=>{
                        return (
                            <Route path={r.path} key={r.name} exact component={loadable(r.component)}/>
                        )
                    })
                }
            </Switch>
        )
    }
}
