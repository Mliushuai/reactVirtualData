import React, { Component, PropTypes } from 'react';
import { Router,Link } from 'react-router';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import { is, fromJS } from 'immutable';
import { Layout, Menu, Icon,Avatar,Badge   } from 'antd';
import Config from '../../config/index';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import {bindActionCreators} from 'redux';
import {changekeyData} from '../../redux/action/changeKeyActions';
import './style/layout.less'
const SubMenu = Menu.SubMenu;
const { Header } = Layout;

/**
 * 公共头部
 * * @export
 * @class Lheader
 * @extends {Component}
 */
class Lheaders extends Component {
	constructor(props, context) {
		super(props, context); //后才能用this获取实例化对象
		this.state={
			changeKey:this.props.state.changeDataReducer.changeData
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
	toggle = () => {
		this.props.toggle(!this.props.collapsed);
  	}
  	logout= (e) => {
  		// 模拟退出
  		if(e.key == 'logout') {
	 		Config.removeLocalItem(Config.localKey.userToken);
	  		this.context.router.push({ 
				pathname: '/login' 
			});
  		}
  	}
  	componentDidMount(){

        console.log(this.props,"标题")
        browserHistory.push('/home')
    }
	render() {
		return (
			<Header className="layout-header">
                <span style={{display:"block",color:"#fff",fontSize:"24px",float:"left",width:"230px",lineHeight:"70px",marginLeft:"25px"}}>这是个模拟系统</span>
                <Bcrumb icon={this.props.state.changeDataReducer.types} title={this.props.state.changeDataReducer.changeData}/>
	            <div style={{position:"absolute",top:"0",right:"0",width:"25%",height:"70px"}}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  className="AvatarUser" />
                    <Menu mode="horizontal" onClick={this.logout} className="AvatarRoot">
                        <SubMenu title={<span>sosout</span>} >
                            <Menu.Item key="logout" style={{width:"80px"}}>注销</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <Icon type="clock-circle-o" className="AvatarIconBell"/>
                    <Icon type="setting" className="AvatarIconSetting" />
                    <Badge count={this.props.number} className="AvatarIcon">
                        <Link to='/home'><Icon type="bell" /></Link>
                    </Badge>
                </div>
	        </Header>
		)
	}
}

// Lheader.contextTypes = {
//     router: React.PropTypes.object.isRequired
// };
// 将 state 作为 props 绑定到 Product 上。
const mapStateToProps = (state, ownProps) => {
    const {sourceNumber,changeDataReducer} = state
    return {
        sourceNumber: sourceNumber,
        changeData:changeDataReducer,
        state
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({changekeyData}, dispatch)
});

const Lheader = connect(mapStateToProps, mapDispatchToProps)(Lheaders)
export default Lheader