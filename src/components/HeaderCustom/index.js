import React from 'react';
import {Layout,Icon,Menu,Badge} from 'antd';
import {withRouter} from 'react-router-dom'
import avater from '../../style/imgs/b1.jpg';
import screenfull from 'screenfull'
const {SubMenu}  = Menu;

const Header  = Layout.Header;
 class HeaderCustom extends React.Component{
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }
    };
    menuClick = e => {
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        localStorage.clear();
        this.props.history.push('/login')
    };
    render(){
        return(
            <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                    className="trigger custom-trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right',marginRight:'8px' }}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>
                    {<SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <Menu.Item>个人中心</Menu.Item>
                        <Menu.Item>修改密码</Menu.Item>
                        <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                    </SubMenu>}
                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
            </Header>

        )
    }
}
export default withRouter(HeaderCustom)