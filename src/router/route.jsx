/**
 * 疑惑一：
 * React createClass 和 extends React.Component 有什么区别?
 * 之前写法：
 * let app = React.createClass({
 *  	getInitialState: function(){
 *    	// some thing
 *  	}
 *  })
 * ES6写法(通过es6类的继承实现时state的初始化要在constructor中声明)：
 * class exampleComponent extends React.Component {
 *    constructor(props) {
 *        super(props);
 *        this.state = {example: 'example'}
 *    }
 * }
 */

import React, {Component, PropTypes} from 'react'; // react核心
import {Router, Route, Redirect, IndexRoute, browserHistory, hashHistory} from 'react-router'; // 创建route所需
import Config from '../config/index';
import layout from '../component/layout/layout'; // 布局界面
import login from '../containers/login/login'; // 登录界面

/**
 * (路由根目录组件，显示当前符合条件的组件)
 *
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
    render() {
        // 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
        return (
            <div>{this.props.children}</div>
        );
    }
}

// const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

// 主页
const general = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/home/homeIndex').default)
    }, 'general');
}
//home 一键顺控
const onekey = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/home/pendingIndexs').default)
    }, 'onekey');
}
//home 设备运转状态
const AbnormalEquipment = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/home/AbnormalEquipment').default)
    }, 'AbnormalEquipment');
}
//home 预警信息
const EarlyWarning = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/home/EarlyWarning').default)
    }, 'EarlyWarning');
}
//异常警报
const larum = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/charts/lines').default)
    }, 'larum');
}

const FireOut = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/charts/FireOut/FireOut').default)
    }, 'chartLine');
}
// 智能巡检
const AIinspect = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/user/userIndex').default)
    }, 'AIinspect');
}

// 事件编制
const parameter = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/general/buttonIndex').default)
    }, 'parameter');
}
// 数据分析
const data = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/ui/oneIndex').default)
    }, 'data');
}
// 历史记录
const history = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/adver/adverIndex').default)
    }, 'history');
}

// 基础组件-图标
const icon = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/general/iconIndex').default)
    }, 'icon');
}


// 系统设置
const setting = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/setting/settingIndex').default)
    }, 'setting');
}
//组织权限管理
const personnel = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/admin/organization').default)
    }, 'personnel');
}
//权限管理
const power = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/admin/twoIndex').default)
    }, 'power');
}

//新增预案
const reserve = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/setting/reserve').default)
    }, 'reserve');
}

//预案节点
const preplan = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/setting/Preplan').default)
    }, 'preplan');
}
/**
 * 详情
 * @param location
 * @param cb
 */
const contentDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/detail/contentDetail').default)
    }, 'preplan');
}
// 登录验证
const requireAuth = (nextState, replace) => {
    // let token = (new Date()).getTime() - Config.localItem('USER_AUTHORIZATION');
    // if(token > 7200000) { // 模拟Token保存2个小时
    // 	replace({
    // 		pathname: '/login',
    // 		state: { nextPathname: nextState.location.pathname }
    // 	});
    // }
}

const RouteConfig = (
    <Router history={browserHistory}>
        <Route path="/home" component={layout}>
            <IndexRoute getComponent={general} onEnter={requireAuth}/> //
            默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
            <Route path="/general" getComponent={general} onEnter={requireAuth}/>
            <Route path="/onekey" getComponent={onekey} onEnter={requireAuth}/>
            <Route path="/larum" getComponent={larum} onEnter={requireAuth}/>
            <Route path="/AIinspect" getComponent={AIinspect} onEnter={requireAuth}/>
            <Route path="/contentDetail" getComponent={contentDetail} onEnter={requireAuth}/>
            <Route path="/parameter" getComponent={parameter} onEnter={requireAuth}/>
            <Route path="/data" getComponent={data} onEnter={requireAuth}/>
            <Route path="/history" getComponent={history} onEnter={requireAuth}/>
            <Route path="/personnel" getComponent={personnel} onEnter={requireAuth}/>
            <Route path="/power" getComponent={power} onEnter={requireAuth}/>
            <Route path="/home/AbnormalEquipment" getComponent={AbnormalEquipment} onEnter={requireAuth}/>
            <Route path="/home/EarlyWarning" getComponent={EarlyWarning} onEnter={requireAuth}/>
            <Route path="/charts/FireOut/FireOut" getComponent={FireOut} onEnter={requireAuth}/>
            <Route path="/general/icon" getComponent={icon} onEnter={requireAuth}/>
            <Route path="/reserve" getComponent={reserve} onEnter={requireAuth}/>
            <Route path="/preplan" getComponent={preplan} onEnter={requireAuth}/>
            <Route path="/setting" getComponent={setting} onEnter={requireAuth}/>

        </Route>
        <Route path="/login" component={Roots}> // 所有的访问，都跳转到Roots
            <IndexRoute component={login}/> // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
        </Route>
        <Redirect from="*" to="/login"/>
    </Router>
);

export default RouteConfig;
