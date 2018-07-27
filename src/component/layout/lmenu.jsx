import React, {Component, PropTypes} from 'react';
import Config from '../../config/index';
import {Router, Route, IndexRoute, browserHistory, hashHistory, Link} from 'react-router';
import {Layout, Menu, Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {numberSource, loadings} from '../../redux/action/NumberSource'
import {changekeyData} from '../../redux/action/changeKeyActions';
// 布局样式
import './style/layout.less';

const SubMenu = Menu.SubMenu;

/**
 * 公共菜单
 *
 * @export
 * @class Lmenu
 * @extends {Component}
 */
class Lmenus extends Component {
    constructor(props, context) {
        super(props, context); //后才能用this获取实例化对象
        const openKeys = Config.localItem('OPENKEY') ? [Config.localItem('OPENKEY')] : [];
        this.state = {
            openKeys: openKeys
        };
    }

    onOpenChange = (openKeys) => {

        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        Config.localItem('OPENKEY', nextOpenKeys);
        this.setState({openKeys: nextOpenKeys});
    }
    getAncestorKeys = (key) => {
        const map = {
            sub3: ['sub2'],
        };
        return map[key] || [];
    }
    changKey = (key,type) => {
        const {actions} = this.props;
        let changeData = key.key;
        actions.changekeyData(changeData,type)
    }

    render() {
        const defaultSelectedKey = process.env.NODE_ENV !== 'production' ? [location.pathname.split('/')[location.pathname.split('/').length - 1] || 'home'] : [location.hash.split('/')[location.hash.split('/').length - 1].split('?')[0] || 'home'];
        return (
            <Menu openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} theme="dark" mode={this.props.mode}
                  defaultSelectedKeys={defaultSelectedKey}
                  style={{backgroundColor: "#f0f2f5", marginTop: "30px"}}
                  className="layoutLeft"
            >
                <Menu.Item key="总体状态" onClick={(key) => this.changKey(key,"laptop")}>
                    <Link to="/home">
                        <Icon type="laptop" style={{color: "#384042"}}/>
                        <span className="nav-text" style={{color: "#384042"}}>总体状态</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="一键顺控" onClick={(key) => this.changKey(key,"user")}>
                    <Link to="/home/pendingIndex">
                        <Icon type="user" style={{color: "#384042"}}/>
                        <span className="nav-text" style={{color: "#384042"}}>一键顺控</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="异常警报" onClick={(key) => this.changKey(key,"notification")}>
                    <Link to="/chart/line">
                        <Icon type="notification" style={{color: "#384042"}}/>
                        {<span className="nav-text" style={{color: "#384042"}}>异常警报</span>}
                    </Link>
                </Menu.Item>

                {/*<SubMenu key="general" title={<span><Icon type="team" />/oneKey<span className="nav-text">事件消息编制</span></span>}>*/}
                {/*<Menu.Item key="button"><Link to="/general/button">按钮</Link></Menu.Item>*/}
                {/*<Menu.Item key="icon"><Link to="/general/icon">图标</Link></Menu.Item>*/}
                {/*</SubMenu>*/}
                <Menu.Item key="智能巡检" onClick={(key) => this.changKey(key,"user")}>
                    <Link to="/user">
                        <Icon type="user" style={{color: "#384042"}}/>
                        <span className="nav-text" style={{color: "#384042"}}>智能巡检</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="事件编制" onClick={(key) => this.changKey(key,"dashboard")}>
                    <Link to="/general/button">
                        <Icon type="dashboard" style={{color: "#384042"}}/>
                        {<span className="nav-text" style={{color: "#384042"}}>事件编制</span>}
                    </Link>
                </Menu.Item>
                {/*<Menu.Item key="setting">*/}
                {/*<Link to="/setting">*/}
                {/*<Icon type="setting" />*/}
                {/*<span className="nav-text">预案编制</span>*/}
                {/*</Link>*/}
                {/*</Menu.Item>*/}
                <Menu.Item key="数据分析" onClick={(key) => this.changKey(key,"team")}>
                    <Link to="/ui/oneui">
                        <Icon type="team" style={{color: "#384042"}}/>
                        <span className="nav-text" style={{color: "#384042"}}>数据分析</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="历史记录" onClick={(key) => this.changKey(key,"notification")}>
                    <Link to="/adver">
                        <Icon type="notification" style={{color: "#384042"}}/>
                        {<span className="nav-text" style={{color: "#384042"}}>历史记录</span>}
                    </Link>
                </Menu.Item>

                <SubMenu key="123"
                         title={<span><Icon type="setting" style={{color: "#384042"}}/>
                             <span className="nav-text" style={{color: "#384042"}}>系统设置</span></span>}>
                    <Menu.Item key="组织人员管理" onClick={(key) => this.changKey(key)}>
                        <Link to="/admin/organ" style={{color: "#384042"}}>组织人员管理</Link>
                    </Menu.Item>
                    <Menu.Item key="权限管理" onClick={(key) => this.changKey(key)}>
                        <Link to="/admin/juris" style={{color: "#384042"}}>权限管理</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

// 将 state 作为 props 绑定到 Product 上。
const mapStateToProps = (state, ownProps) => {
    const {sourceNumber, changeDataReducer} = state
    return {
        sourceNumber: sourceNumber,
        changeData: changeDataReducer,
        state
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({changekeyData, numberSource}, dispatch)
});

const Lmenu = connect(mapStateToProps, mapDispatchToProps)(Lmenus)
export default Lmenu;