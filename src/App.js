import React, { Component } from 'react';
import SideCustom from './components/SideMenu';
import HeaderCustom from './components/HeaderCustom';
import Routes from './routes'
import { Layout } from 'antd';
const {Content } = Layout;
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            collapsed: false,
        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
  render() {
    return (
        <Layout>
            <SideCustom collapsed={this.state.collapsed}/>
            <Layout>
                <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} />
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    <Routes />
                </Content>
            </Layout>
        </Layout>
    );
  }
}

export default App;
