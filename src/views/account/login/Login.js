import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './login.less';
import logoUrl from '../../../style/imgs/logo-h.png'
import {Row,Col,Alert,Tabs,Icon} from 'antd';
import PwdForm from './PwdFrom'
import { withRouter} from 'react-router-dom';
const TabPane = Tabs.TabPane;
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error:'none'
        }
    }
    render(){
        return(
            <Row type="flex" justify="center" align="middle" className="login">
                <Col style={{width:'368px'}}>
                    <Row className="header">
                        <img src={logoUrl} style={{width:'220px'}}/>
                        <div className="description">MuTouGou Educator Platform</div>
                    </Row>
                    <Alert message="Error" type="error" showIcon style={{display:this.state.error}}/>
                    <Row className="login_form">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><Icon type="user"/>账户密码登录</span>} key="1">
                                <PwdForm />
                            </TabPane>
                            <TabPane tab={<span><Icon type="phone"/>手机号登录</span>} key="2">
                                Tab2
                            </TabPane>
                        </Tabs>
                    </Row>
                </Col>
            </Row>
        )
    }
}
export default Login;