import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import Config from '../../config/index';
import {Icon, Row, Col, Card, Button, Modal, Menu, Dropdown, message} from 'antd';
import {Tree, Input} from 'antd';

import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
import "./style.css"
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入折线图
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/gauge'
// 标题插件
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';

import styles from './style/user.less';
import EchartsLine from './EchartsLine'
import Backgrounds from './image/img2.jpg';
import BackgroundImage from './image/img3.jpg';
const sectionStyles = {
    width: "100%",
    height: "60px",
    backgroundImage: `url(${BackgroundImage})`,

};
const sectionStyle = {
    width: "100%",
    height: "80px",
    backgroundImage: `url(${Backgrounds})`,
    // borderBotton:"2px solid #eee",
    backgroundSize:"100% 100%"
};
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const columns = [
    {
        code: 'LHJ001',
        codeindex: "#1号位:油压监测",
        success: "正常",
        testModel: "持续",
        testType: "仪表",
        urls: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532088583863&di=f5f097f3850d2ce4585d9d73fc4fb0f2&imgtype=0&src=http%3A%2F%2Fauctions.c.yimg.jp%2Fimages.auctions.yahoo.co.jp%2Fimage%2Fdr000%2Fauc0211%2Fusers%2F8%2F0%2F9%2F1%2Frika7750-img600x450-1480334054rxmkff860.jpg"
    },
    {
        code: 'LHJ002',
        codeindex: "#2号位:异常监测",
        success: "正常",
        testModel: "周期20分钟/次",
        testType: "异常",
        urls: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4285440562,2214366799&fm=27&gp=0.jpg"
    }
];
/**
 * 树结构搜索
 */


const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const tns = _tns || gData;
    const children = [];
    tns.push({title: "清梅变", key: "清梅变", children: [{title: "电力", key: "电力"}]})
    tns.push({title: "蠡湖变", key: "蠡湖变", children: [{title: "清本", key: "清本"}]})
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

const menu = (
    <Menu onClick={handleMenuClick} style={{width: 120, textAlign: "center"}}>
        <Menu.Item key="1"> <Link to="/history"><Icon type="user"/>详情查看</Link></Menu.Item>
        <Menu.Item key="2"> <Link to="/history"><Icon type="pie-chart"/>历史数据</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/parameter"><Icon type="dashboard"/>更改配置</Link></Menu.Item>
        <Menu.Item key="4"> <Link to="/larum"><Icon type="calendar"/>报告异常</Link></Menu.Item>
    </Menu>
);


function handleMenuClick(e) {

}

/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);
        const treeData = [
            {
                title: '清梅变---20点位',
                key: '0-1',
                children: [{
                    title: '运检一处',
                    key: '0-1-1',
                    children: [
                        {title: '一配电站', key: '0-1-1-0'},
                    ],
                }],
            },
            {
                title: '清梅变---40点位',
                key: '0-2',
                children: [{
                    title: '运检二处',
                    key: '0-2-1',
                    children: [
                        {title: '十五配电站', key: '0-2-1-0'},
                    ],
                }],
            },

        ];
        this.state = {
            visible: false,
            showButton: false,
            nowData: columns,
            // titlename: someMethod,
            searchValue: '',
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
            treeData: treeData,
            expand: false,
            columns: columns,
            // data:data,
            type: "1",
            disabled: false,
            titleType: "",
            visibles: false,
            peopleAdd: "",
            value: "one",
            values: "ones",
            modalKey: "",
            butVisible: true,
            sourceType: "",
            record: ""
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
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
            <div >
                <div className="DayContent">
                <Row >
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card style={{width: "100%", minHeight: 810}}>
                            <div style={sectionStyles} >
                                <h3 className="char-tieles">点位列表</h3>
                            </div>
                            <Search
                                style={{marginBottom: 8,marginLeft:"20px",marginTop:"25px",width:"90%"}}
                                placeholder="请输入要搜索的点位"
                                onChange={this.onChange}
                            />
                            <Tree
                                onExpand={this.onExpand}
                                expandedKeys={expandedKeys}
                                autoExpandParent={autoExpandParent}
                                style={{marginLeft:"16px"}}
                            >
                                {loop(gData)}
                            </Tree>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                        <Card style={{width: "100%", minHeight: 810,}}>
                            <div style={sectionStyle} >
                                <span style={{}} className="change">蠡湖变</span>
                            </div>


                            {this.state.nowData.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Col key={index} xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <div key={index} className="user-container">
                                                <span style={{display:"block",width:"100%",fontSize:"16px",paddingLeft:"20px",marginTop:"15px"}}>
                                                    <span style={{float:"left"}}>巡检编号:{item.code}</span><span style={{float:"right",paddingRight:"20px"}}>{item.codeindex}</span>
                                                </span>

                                                <img style={{width: 610, height: 400,marginTop:"15px",paddingLeft:"20px"}} src={item.urls} alt=""/>
                                                <h3 style={{display:"block",width:"100%",fontSize:"16px",paddingLeft:"20px",marginTop:"15px"}}>
                                                    <span style={{width:"10px",height:"10px",backgroundColor:"#f2ba0f",display:"block",float:"left",marginTop:"7px"}}></span>&nbsp;&nbsp;状态：{item.success}</h3>
                                                <h3 style={{display:"block",width:"100%",fontSize:"16px",paddingLeft:"20px",marginTop:"15px"}}>
                                                    <span style={{width:"10px",height:"10px",backgroundColor:"#f13283",display:"block",float:"left",marginTop:"7px"}}></span>&nbsp;&nbsp;监测模式：{item.testModel}</h3>
                                                <h3 style={{display:"block",width:"100%",fontSize:"16px",paddingLeft:"20px",marginTop:"15px"}}>
                                                    <span style={{width:"10px",height:"10px",backgroundColor:"#10a3e7",display:"block",float:"left",marginTop:"7px"}}></span>&nbsp;&nbsp;监测类型：{item.testType}</h3>
                                                <div className="user-test-button">
                                                    <Dropdown overlay={menu}>
                                                        <Button style={{float:"right",backgroundColor:"#384042",color:"#Fff"}} >
                                                            操作 <Icon type="down"/>
                                                        </Button>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </Col>
                                    </div>
                                )
                            })}
                        </Card>
                    </Col>
                </Row>
                </div>
                <Modal
                    title="巡检详情"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    width={900}
                    bodyStyle={{height: "500px"}}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    footer={null}
                >
                    <div className="video-min">
                        <div className="video-left">
                            <Button onClick={this.handleOk} type="primary">返回</Button>
                            <img src={require("../../public/index.jpg")} alt=""/>
                            <div className="video-two-but">
                                <Button onClick={this.handleOk} type="primary">正常</Button>
                                <Button onClick={this.handleOk} type="primary">报告异常</Button>
                            </div>
                        </div>
                        <div className="video-right">
                            <h3><span>设备编号：</span>000000</h3>
                            <h3><span>设备类型：</span>油位表</h3>
                            <h3><span>当前状态：</span>60 （正常）</h3>
                            <h3><span>状态预测：</span>临近警戒线</h3>
                            <EchartsLine
                                Width={100}
                                Height={100}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

}

export default Main;

