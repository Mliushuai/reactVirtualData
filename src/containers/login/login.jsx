import React, {Component} from 'react'; // 引入了React
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import Config from '../../config/index';
import {browserHistory} from 'react-router';
import {initialState, goLogin} from '../../redux/action/login/loginAction';//引入Action
import {test} from '../../redux/action/test'

import styles from './style/login.less';

import {Spin, Form, Input, Button, message} from 'antd';

const FormItem = Form.Item;
import loginBackground from './image/背景.jpg';
import logo from './image/logo.jpg'

const loginStyle = {
    backgroundImage: `url(${loginBackground})`,
    backgroundSize: "100% 100%",
};

/* 以类的方式创建一个组件 */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordDirty: false,
            loginBtnText: '登录'
        };
    }

    /**
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
     * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     */
    componentDidMount() {
        const {actions, form} = this.props;
        console.log(actions, "actions")
        // 初始化数据
        actions.initialState();
    }

    handleSubmit = (e) => { // 登录
        e.preventDefault();

        const {actions, form} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let username = values.username, // 用户名
                    password = values.password, // 密码
                    loginParams = { // 登录参数
                        username: username,
                        password: password
                    };
                actions.goLogin(loginParams);
            }
        });
    }
    // 验证用户名
    checkUsername = (rule, value, callback) => {
        const form = this.props.form;
        if (!value) {
            callback();
        } else if (!Config.checkEng(value)) {
            callback(Config.message.usernameEng);
        } else {
            callback();
        }
    }
    // 验证密码
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.passwordDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }
    //测试接口
    // test=()=>{
    //     const {actions} = this.props;
    //   let loginParams = { // 登录参数
    //            pagesize: 10,
    //            pageIndex:1,
    //        };
    //    actions.test(loginParams);
    // }

    render() {

        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-container" style={loginStyle}>
                <div style={{width: "100%", height: "200px"}}></div>
                <div className="login-form">
                    <Spin tip="载入中..." spinning={false}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem hasFeedback>
                                {getFieldDecorator('title')(
                                    <div className="loginTitle">
                                        <img src={logo}/>
                                        <p>XXXX智能XXX系统</p>
                                    </div>
                                )}
                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('username', {
                                    rules: [{
                                        required: true,
                                        message: Config.message.usernameInput
                                    }, {validator: this.checkUsername}]
                                })(
                                    <div className="userName">
                                        <Input size="large" placeholder="用户账号或用户邮箱" maxLength="20"
                                               style={{marginTop: "10px"}}/>
                                    </div>
                                )}
                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        message: Config.message.passwordInput
                                    }, {validator: this.checkPassword}]
                                })(
                                    <div className="userName">
                                        <Input size="large" type="password" placeholder="请输入密码" maxLength="6"
                                               style={{marginTop: "10px"}}/>
                                    </div>
                                )}
                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('noPassword')(
                                    <p style={{
                                        color: "#bbb",
                                        textAlign: "right",
                                        margin: "0",
                                        padding: "0",
                                        marginTop: "-20px"
                                    }}>忘记密码</p>
                                )}
                            </FormItem>


                            <FormItem>
                                <div className="loginButton">
                                    <Button type="primary" htmlType="submit" size="large"
                                            className="goLogin"> 登录</Button>
                                </div>
                            </FormItem>
                        </Form>
                    </Spin>
                </div>
            </div>
        );
    }
}


// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
    return state
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({initialState, goLogin}, dispatch)
});

const Main = connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login)); // 连接redux

export default Main;
