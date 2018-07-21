import React, {Component, PropTypes} from 'react';
import {is, fromJS} from 'immutable';
import Config from '../../config/index';
import {Router, Route, IndexRoute, browserHistory,hashHistory, Link} from 'react-router';
import {Layout, Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;

/**
 * 公共菜单
 *
 * @export
 * @class Lmenu
 * @extends {Component}
 */
export class Lmenu extends Component {
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

    render() {
        // const pathName = hashHistory.getCurrentLocation().pathname;
        const defaultSelectedKey = process.env.NODE_ENV !== 'production' ? [location.pathname.split('/')[location.pathname.split('/').length - 1] || 'home'] : [location.hash.split('/')[location.hash.split('/').length - 1].split('?')[0] || 'home'];
        return (
            <Menu openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} theme="dark" mode={this.props.mode}
                  defaultSelectedKeys={defaultSelectedKey}>
                <Menu.Item key="home">
                    <Link to="/home">
                        <Icon type="laptop"/>
                        <span className="nav-text">总体状态</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="users">
                    <Link to="/home/pendingIndex">
                        <Icon type="user" />
                        <span className="nav-text">一键顺控</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="chart">
                    <Link to="/chart/line">
                        <Icon type="notification"/>
                        {<span className="nav-text">异常警报</span>}
                    </Link>
                </Menu.Item>

                {/*<SubMenu key="general" title={<span><Icon type="team" />/oneKey<span className="nav-text">事件消息编制</span></span>}>*/}
                {/*<Menu.Item key="button"><Link to="/general/button">按钮</Link></Menu.Item>*/}
                {/*<Menu.Item key="icon"><Link to="/general/icon">图标</Link></Menu.Item>*/}
                {/*</SubMenu>*/}
                <Menu.Item key="user">
			        <Link to="/user">
		              <Icon type="user" />
		              <span className="nav-text">智能巡检</span>
		            </Link>
	            </Menu.Item>
                <Menu.Item key="button">
                    <Link to="/general/button">
                        <Icon type="dashboard"/>
                        {<span className="nav-text">事件编制</span>}
                    </Link>
                </Menu.Item>
	            {/*<Menu.Item key="setting">*/}
	            {/*<Link to="/setting">*/}
	              {/*<Icon type="setting" />*/}
	              {/*<span className="nav-text">预案编制</span>*/}
	            {/*</Link>*/}
	            {/*</Menu.Item>*/}
                <Menu.Item key="oneui"><Link to="/ui/oneui"><Icon type="team" /><span className="nav-text">数据分析</span></Link></Menu.Item>
	            <Menu.Item key="adver"><Link to="/adver"> <Icon type="notification" /> {<span className="nav-text">历史记录</span>}</Link> </Menu.Item>

	            <SubMenu key="123" title={<span><Icon type="setting" /><span className="nav-text">系统设置</span></span>}>
                      <Menu.Item key="9"><Link to="/admin/organ">组织人员管理</Link></Menu.Item>
			          <Menu.Item key="10"><Link to="/admin/juris">权限管理</Link></Menu.Item>
			    </SubMenu>
	        </Menu>
		)
	}
}