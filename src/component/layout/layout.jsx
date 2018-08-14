import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';
import { numberSource }from '../../redux/action/NumberSource'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
import Background from './image/img1.jpg';
// 公共头部
import  Lheader  from './lheader';
// 公共菜单
import  Lmenu  from './lmenu';
// 公共底部
import { Lfooter } from './lfooter';

// 布局样式
import './style/layout.less';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import layoutUser from "./image/用户.png";
const { Content, Footer, Sider,Header } = Layout;
const SubMenu = Menu.SubMenu;

/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
	constructor(props) {
		super(props);
		const collapsed = false;
		this.state = {
			collapsed: collapsed,
    		mode: collapsed ? 'vertical' : 'inline', 
		};
		this.timer=null
	}
	onCollapse = (collapsed) => {
		// if(collapsed) Config.localItem('COLLAPSED', 'YES'); else Config.localItem('COLLAPSED', 'NO');
	    this.setState({
	      collapsed,
	      mode: 'vertical'
	    });
	}
	toggle = (collapsed) => {
		if(collapsed) Config.localItem('COLLAPSED', 'YES'); else Config.localItem('COLLAPSED', 'NO');
	    this.setState({
	      collapsed: collapsed,
	      mode: collapsed ? 'vertical' : 'inline'
	    });
  	}
  	shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    componentDidMount(){
                this.props.actions.numberSource(2,"0")
    }
	render() {
		// 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
		return (
		<Layout className="layout">
           <Lheader collapsed={this.state.collapsed}
                         toggle={ collapsed => this.toggle(collapsed) }
                         number={this.props.sourceNumber.numberSource1===2&&this.props.sourceNumber.loading||this.props.sourceNumber.numberSource1===1?this.props.sourceNumber.numberSource1:0}
           />
            <Layout>
                <Sider
                       collapsed={this.state.collapsed}
                       onCollapse={this.onCollapse}
                       style={{backgroundColor:"#5f6364",width:"200px"}}
                >
                    <div className="layout-logo">
                        <div className="layout-user">
                            <img src={layoutUser}/>
                            <span>刘大伟</span>
                        </div>
                        <span>系统管理员</span>
                        <span style={{marginTop:"6px"}}>无锡供电公司某某分局</span>
                    </div>
                    <Lmenu mode={ this.state.mode } />
                </Sider>
                <Layout >
                    <Content className="layout-content" >
                    {this.props.children}
                    </Content>
                    {/*<Lfooter />*/}
                </Layout>
            </Layout>

	    </Layout>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
    return state
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({ numberSource }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

