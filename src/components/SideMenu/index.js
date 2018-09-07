import React from 'react';
import { Layout } from 'antd';
import {withRouter} from 'react-router-dom'
import {initRouter} from '../../libs/util'
import SiderMenu from './SiderMenu'
const { Sider } = Layout;

 class SideCustom extends React.Component{
     state = {
         menus:[],
         collapsed: false,
         mode: 'inline',
         openKey: '',
         selectedKey: ''
     };
     componentDidMount() {
         initRouter().then(res=>{
             this.setState({
                 menus:res
             })
         })
         this.setMenuOpen(this.props);
     }
     onCollapse = (collapsed) => {
         this.setState({
             collapsed,
             mode: collapsed ? 'vertical' : 'inline',
         });
     };
     componentWillReceiveProps(nextProps) {
         this.onCollapse(nextProps.collapsed)
         this.setMenuOpen(nextProps)
     }
     setMenuOpen = props => {
         const { pathname } = props.location;
         this.setState({
             openKey: pathname.slice(4,pathname.lastIndexOf('/')),
             selectedKey: pathname.slice(pathname.lastIndexOf('/')+1)
         });
     }
     menuClick = e => {
         this.setState({
             selectedKey: e.key
         });
     };
     openMenu = v => {
         this.setState({
             openKey: v[v.length - 1]
         })
     };
    render(){
        return(
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{ overflowY: 'auto' }}
            >
                <div className="logo" />
                <SiderMenu
                    menus={this.state.menus}
                    onClick={this.menuClick}
                    theme="dark"
                    mode={this.state.mode}
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={[this.state.openKey]}
                    onOpenChange={this.openMenu}
                />
            </Sider>
        )
    }
}

export default withRouter(SideCustom)