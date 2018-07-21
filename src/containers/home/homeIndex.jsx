import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import {Router, Route, IndexRoute, browserHistory, History, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onIncrement, onDecrement} from '../../redux/action/counter'
// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';

import styles from './style/home.less';
import "../../public/css/publicStyle.css"
import '../../style/left.less';
import '../home/style/style.css'
import {Icon, Row, Col, Card, Modal, Steps, Button, message, Table, Tree, Input} from 'antd';
import someMethod from '../../containers/home/method'

const Step = Steps.Step;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

/* 以类的方式创建一个组件 */
const columns = [{
    title: '待处理工票',
    dataIndex: 1,
}, {
    title: '远程会商',
    dataIndex: 'XXX进行中',
}, {
    title: '住址',
    dataSize: 1,
}, {
    title: '预警信息',
    dataSize: 0,
},
];

/**
 * 树结构搜索
 */

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const tns = _tns || gData;
    const children = [];
    tns.push(
        {
            title: "清梅变",
            key: "清梅变",
            children: [{title: "电力", key: "电力"}]
        }, {
            title: "蠡湖变",
            key: "蠡湖变",
            children: [{title: "清本", key: "清本"}]
        })
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

const dataList = [];
const generateList = data => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({key, title: key});
        if (node.children) {
            generateList(node.children, node.key);
        }
    }
};
generateList(gData);
const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

class Main extends Component {
    constructor(props) {
        super(props);
        let date = new Date()
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        const currentdate = year + seperator1 + month + seperator1 + strDate;

        this.state = {
            titlename: someMethod,
            expandedKeys: [],
            searchValue: "",
            autoExpandParent: true,
            showData: currentdate
        };

    }


    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };

    onChange = e => {
        const value = e.target.value;
        const expandedKeys = dataList
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, gData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true
        });
    };

    componentDidMount() {

    }

    render() {
        const {searchValue, expandedKeys, autoExpandParent} = this.state;
        const loop = data =>
            data.map(item => {
                const index = item.title.indexOf(searchValue);
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
              {beforeStr}
                            <span style={{color: "#f50"}}>{searchValue}</span>
                            {afterStr}
            </span>
                    ) : (
                        <span>{item.title}</span>
                    );
                if (item.children) {
                    return (
                        <TreeNode key={item.key} title={title}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.key} title={title}/>;
            });
        return (
            <div style={{width: "100%", height: "800px", backgroundColor: "#fff", marginTop: "20px"}}>
                <Bcrumb title="站点列表" icon="users"/>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <Card style={{width: "100%", minHeight: 640, padding: 10}}>
                            <h3 className="char-tiele">点位列表</h3>
                            <div className="leter-min">
                                <Search
                                    style={{marginBottom: 8}}
                                    placeholder="Search"
                                    onChange={this.onChange}
                                />
                                <div className="home-tree">
                                    <Tree
                                        onExpand={this.onExpand}
                                        expandedKeys={expandedKeys}
                                        autoExpandParent={autoExpandParent}
                                    >
                                        {loop(gData)}
                                    </Tree>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                        <Card className="box" style={{width: "100%", minHeight: 640, padding: 10}}>
                            <div className="box">
                                <div className="column">
                                    <div className="item">

                                        <Link to='/home/pendingIndex'>
                                            <Card
                                                className="nav-min"
                                                hoverable={true}
                                            >
                                                <h3 style={{color: "#eee"}}>待处理工票</h3>
                                                <h2 style={{color: "#eee"}}>1</h2>
                                            </Card>
                                        </Link>

                                    </div>
                                    <div className="item">
                                        <Link to='/home/AbnormalEquipment'>
                                            <Card
                                                className="nav-min"
                                                hoverable={true}
                                            >
                                                <h3 style={{color: "#eee"}}>日常巡检</h3>
                                                <h3 style={{color: "#eee"}}>今日巡检已完成</h3>
                                                <h3 style={{color: "#eee"}}>下次巡检时间</h3>
                                                <h3 style={{color: "#eee"}}>{this.state.showData}</h3>
                                            </Card>
                                        </Link>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="item">

                                        <Link to='/general/button'>
                                            <Card
                                                className="nav-min"
                                                hoverable={true}
                                            >
                                                <h3 style={{color: "#eee"}}>环境异常</h3>
                                                <h3 style={{color: "#eee"}}>设备异常：<span>1</span>条</h3>
                                            </Card>
                                        </Link>

                                    </div>
                                    <div className="item">

                                        <Link to='/home/EarlyWarning'>
                                            <Card
                                                className="nav-min"
                                                hoverable={true}
                                            >
                                                <h3 style={{color: "#eee"}}>预警信息</h3>
                                                <h3 style={{color: "#eee"}}>紧急：<span>0</span>条</h3>
                                                <h3 style={{color: "#eee"}}>预警：<span>1</span>条</h3>
                                            </Card>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Main;