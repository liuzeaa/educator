import React from 'react';
import {withRouter} from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {login,userInfo} from '../../../api';
import {setStorage} from "../../../libs/storage";
import Cookies from "js-cookie";
const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            loginButton:'登录'
        }
    }
    handleSubmit = (e) => {
        this.setState({
            loading:true,
            loginButton:"登录中"
        })
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            let res = await login({username: values.username, password: values.password, saveLogin: values.saveLogin});
            if(res.success){

                setStorage('accessToken',res.result);
                // 获取用户信息
                userInfo().then(res => {
                    if (res.success) {
                        // 避免超过大小限制
                        delete res.result.permissions;
                         let roles = [];
                         res.result.roles.forEach(e => {
                             roles.push(e.name);
                         });
                        setStorage("roles", roles);
                        if (values.saveLogin) {
                            // 保存7天
                            Cookies.set("userInfo", JSON.stringify(res.result), {
                                expires: 7
                            });
                        } else {
                            Cookies.set("userInfo", JSON.stringify(res.result));
                        }
                        setStorage("userInfo", res.result);
                        this.props.history.push('/app/home');
                    }
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('saveLogin', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>自动登录</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                        {this.state.loginButton}
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
const PwdForm = Form.create()(LoginForm);
export default withRouter(PwdForm);