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
import headerLogo from './image/headerLogo.png';
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
            browserHistory.push('/login')
	 		// Config.removeLocalItem(Config.localKey.userToken);
	  		// this.context.router.push({
			// 	pathname: '/login'
			// });
  		}
  	}
  	componentDidMount(){

        // console.log(this.props,"标题")
        // browserHistory.push('/home')
    }
	render() {
		return (
			<Header className="layout-header">
                {/*<img src={headerLogo} />*/}
                <span>系统</span>
                <Link to='/general'> <p>待处理事件:&nbsp;&nbsp;{this.props.number}条</p></Link>
                {/*<Bcrumb icon={this.props.state.changeDataReducer.types} title={this.props.state.changeDataReducer.changeData}/>*/}
                {/*<div style={{position:"absolute",top:"0",right:"0",width:"25%",height:"70px"}}>*/}
                    {/*/!*<Avatar src={require("../../containers/image/user.jpg")} className="AvatarUser" />*!/*/}
                    {/*/!*<Menu mode="horizontal" onClick={this.logout} className="AvatarRoot">*!/*/}
                        {/*/!*<SubMenu title={<span>张三</span>} >*!/*/}
                            {/*/!*<Menu.Item key="logout" style={{width:"80px"}}>注销</Menu.Item>*!/*/}
                        {/*/!*</SubMenu>*!/*/}
                    {/*/!*</Menu>*!/*/}
                    {/*/!*<Icon type="clock-circle-o" className="AvatarIconBell"/>*!/*/}
                    {/*/!*<Link to='/home'><Icon type="setting" className="AvatarIconSetting" /></Link>*!/*/}
                    {/*/!*<Badge count={this.props.number} className="AvatarIcon">*!/*/}
                        {/*/!*<Link to='/home'><Icon type="bell" /></Link>*!/*/}
                    {/*/!*</Badge>*!/*/}
                {/*</div>*/}
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