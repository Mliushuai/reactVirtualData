import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import Config from '../../config/index';
import {Icon, Row, Col, Card, Button, Modal, Menu, Dropdown, message, Pagination, Form, Select} from 'antd';
import {Tree, Input} from 'antd';

import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
//引入公共样式
import '../../component/style/public.less'
import RirhtTitleNav from '../../publicModule/RirhtTitleNav'
// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';
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

//引入监测图片
import Monitor from './image/检测.jpg'
import {bindActionCreators} from "redux";
import {loadings, numberSource} from "../../redux/action/NumberSource";
import {changekeyData} from "../../redux/action/changeKeyActions";

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
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
class Mains extends Component {
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
            record: "",
            changeNav: true,// index列表导航一级标签控制
            changeNavChild: true,// index列表导航二级标签控制
            changeStateDic: true,
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
    /**
     * 一级菜单点击
     * */
    navChange = () => {
        this.setState({
            changeNav: false
        })
    };
    /**
     * 一级菜单点击 抬起
     * */
    navChangeUp = () => {
        console.log(this.state.changeNav)
        if (this.state.changeNav == "false") {
            console.log("10086")
        }
        this.setState({
            changeNav: true
        })
    };
    /**
     * 2级菜单点击
     * */
    changeNavChild = () => {
        this.setState({
            changeNavChild: false
        })
    };
    /**
     * 2级菜单点击 抬起
     * */
    changeNavChildUp = () => {
        this.setState({
            changeNavChild: true
        })
    };
    /**
     * 巡点序号排序
     * */
    changBarRankRight = () => {
        this.setState({
            changeStateDic: true
        })
    };
    /**
     *事件类型排序
     * */
    changBarRankLeft = () => {
        this.setState({
            changeStateDic: false
        })
    }
    GoAction = (changeData) => {
        const {actions} = this.props;
        actions.changekeyData(changeData, "")
    }
    getField = () => {

        const {getFieldDecorator} = this.props.form;
        const children = [];
        children.push(
            <Col xs={24} sm={24} md={8} lg={3} xl={3} key={"userName"} style={{height: "40px"}}>
                <FormItem
                    key="name"
                >
                    {getFieldDecorator('userName')(
                        <span className="FormTitle">蠡湖变</span>
                    )}
                </FormItem>
            </Col>
        )
        children.push(
            <Col xs={24} sm={24} md={8} lg={5} xl={5} key={"select"} style={{height: "40px"}}>
                <FormItem
                    key="select"
                >
                    {getFieldDecorator('select')(
                        <Select
                        >
                            <Option value="0">蠡湖变</Option>
                            <Option value="1">清湖变</Option>
                        </Select>
                    )}
                </FormItem>
            </Col>
        )
        children.push(
            <Col xs={24} sm={24} md={8} lg={5} xl={5} key={"input"} style={{height: "40px"}}>
                <FormItem
                    key="input"
                >
                    {getFieldDecorator('select')(
                        <Input placeholder="请输入巡检编号" style={{height: "35px"}}/>
                    )}
                </FormItem>
            </Col>
        )
        children.push(
            <Col xs={24} sm={24} md={8} lg={2} xl={2} key={"button"} style={{height: "40px"}}>
                <FormItem
                    key="button"
                >
                    {getFieldDecorator('button')(
                        <Button style={{border: "1px solid #106664", color: "#106664"}}>搜索</Button>
                    )}
                </FormItem>
            </Col>
        )
        children.push(
            <Col xs={24} sm={24} md={16} lg={8} xl={8} key={"button1"} style={{height: "40px"}}>
                <FormItem
                    key="button1"
                >
                    {getFieldDecorator('button1')(
                        <div className="change-two-tit">
                            <div
                                className={this.state.changeStateDic ? "changeLeft" : "changeRight"}
                                onClick={this.changBarRankRight}
                            >
                                巡点序号排序
                            </div>
                            <div
                                className={this.state.changeStateDic ? "changeRight" : "changeLeft"}
                                onClick={this.changBarRankLeft}
                            >
                                事件类型排序
                            </div>
                        </div>
                    )}
                </FormItem>
            </Col>
        )

        return children;

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
            <div>
                <Row>
                    <Bcrumb title="智能巡检"/>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5} className="LeftFloat">

                        <Card className="contentLeft">
                            <RirhtTitleNav
                                title={"点位点列表"}
                            />
                            {/*<div className="pagin-bottom">*/}
                            {/*<Pagination size="small" total={200} style={{textAlign: "center"}}/>*/}
                            {/*<span style={{display: "block", textAlign: "right", marginRight: "34px"}}>共200条</span>*/}
                            {/*</div>*/}
                        </Card>
                    </Col>
                    <Col xs={23} sm={23} md={23} lg={18} xl={18} className="RightFloat">
                        <Card className="contentRight">
                            <div className="AiTitle">
                                <p>监测点位</p>
                            </div>
                            <Form>
                                <Row gutter={24}>
                                    {this.getField()}
                                </Row>
                            </Form>
                            <div className="Monitor">
                                <Link to='/contentDetail'
                                      onClick={() => this.GoAction('AIinspect')}
                                >
                                    <div className="MonitorList" style={{marginLeft: "0px"}}>
                                        <img src={Monitor}/>
                                        <p>
                                            <span className="MonitorTitles">巡检编号:</span>
                                            <span
                                                className="MonitorCont">&nbsp;&nbsp;&nbsp;LHJ001</span>
                                        </p>
                                        <p>
                                            <span className="MonitorTitles">#1号位:</span>
                                            <span
                                                className="MonitorCont">&nbsp;&nbsp;&nbsp;油压检测</span>
                                        </p>
                                        <p>
                                            <span className="MonitorTitles">状态:</span>
                                            <span className="MonitorCont"
                                                  style={{color: "#006e6b"}}>&nbsp;&nbsp;&nbsp;进行中
                                        </span>
                                        </p>
                                    </div>
                                </Link>
                                <div className="MonitorList">
                                    <img src={Monitor}/>
                                    <p><span className="MonitorTitles">巡检编号:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;LHJ001</span></p>
                                    <p><span className="MonitorTitles">#1号位:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;油压检测</span></p>
                                    <p><span className="MonitorTitles">状态:</span><span className="MonitorCont"
                                                                                       style={{color: "#006e6b"}}>&nbsp;&nbsp;&nbsp;进行中</span>
                                    </p>
                                </div>
                                <div className="MonitorList">
                                    <img src={Monitor}/>
                                    <p><span className="MonitorTitles">巡检编号:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;LHJ001</span></p>
                                    <p><span className="MonitorTitles">#1号位:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;油压检测</span></p>
                                    <p><span className="MonitorTitles">状态:</span><span className="MonitorCont"
                                                                                       style={{color: "#006e6b"}}>&nbsp;&nbsp;&nbsp;进行中</span>
                                    </p>
                                </div>
                                <div className="MonitorList">
                                    <img src={Monitor}/>
                                    <p><span className="MonitorTitles">巡检编号:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;LHJ001</span></p>
                                    <p><span className="MonitorTitles">#1号位:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;油压检测</span></p>
                                    <p><span className="MonitorTitles">状态:</span><span className="MonitorCont"
                                                                                       style={{color: "#006e6b"}}>&nbsp;&nbsp;&nbsp;进行中</span>
                                    </p>
                                </div>
                                <div className="MonitorList" style={{marginLeft: "0px", clear: "both"}}>
                                    <img src={Monitor}/>
                                    <p><span className="MonitorTitles">巡检编号:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;LHJ001</span></p>
                                    <p><span className="MonitorTitles">#1号位:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;油压检测</span></p>
                                    <p><span className="MonitorTitles">状态:</span><span className="MonitorCont"
                                                                                       style={{color: "#006e6b"}}>&nbsp;&nbsp;&nbsp;进行中</span>
                                    </p>
                                </div>
                                <div className="MonitorList">
                                    <img src={Monitor}/>
                                    <p><span className="MonitorTitles">巡检编号:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;LHJ001</span></p>
                                    <p><span className="MonitorTitles">#1号位:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;油压检测</span></p>
                                    <p><span className="MonitorTitles">状态:</span><span className="MonitorCont"
                                                                                       style={{color: "#006e6b"}}>&nbsp;&nbsp;&nbsp;进行中</span>
                                    </p>
                                </div>
                                <div className="MonitorList">
                                    <img src={Monitor}/>
                                    <p><span className="MonitorTitles">巡检编号:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;LHJ001</span></p>
                                    <p><span className="MonitorTitles">#1号位:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;油压检测</span></p>
                                    <p><span className="MonitorTitles">状态:</span><span className="MonitorCont"
                                                                                       style={{color: "#006e6b"}}>&nbsp;&nbsp;&nbsp;进行中</span>
                                    </p>
                                </div>
                                <div className="MonitorList">
                                    <img src={Monitor}/>
                                    <p><span className="MonitorTitles">巡检编号:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;LHJ001</span></p>
                                    <p><span className="MonitorTitles">#1号位:</span><span
                                        className="MonitorCont">&nbsp;&nbsp;&nbsp;油压检测</span></p>
                                    <p><span className="MonitorTitles">状态:</span><span className="MonitorCont"
                                                                                       style={{color: "#006e6b"}}>&nbsp;&nbsp;&nbsp;进行中</span>
                                    </p>
                                </div>
                                <div className="pagin-bottom" style={{width: "600px", marginLeft: "60%"}}>

                                    <Pagination size="small" total={200}
                                                style={{float: "right", width: "320px", marginRight: "20%"}}/>
                                </div>
                            </div>


                        </Card>

                    </Col>
                </Row>
                {/*<div className="DayContent">*/}
                {/*<Row >*/}
                {/*<Col xs={24} sm={24} md={24} lg={6} xl={6}>*/}
                {/*<Card style={{width: "100%", minHeight: 810}}>*/}
                {/*<div style={sectionStyles} >*/}
                {/*<h3 className="char-tieles">点位列表</h3>*/}
                {/*</div>*/}
                {/*<Search*/}
                {/*style={{marginBottom: 8,marginLeft:"20px",marginTop:"25px",width:"90%"}}*/}
                {/*placeholder="请输入要搜索的点位"*/}
                {/*onChange={this.onChange}*/}
                {/*/>*/}
                {/*<Tree*/}
                {/*onExpand={this.onExpand}*/}
                {/*expandedKeys={expandedKeys}*/}
                {/*autoExpandParent={autoExpandParent}*/}
                {/*style={{marginLeft:"16px"}}*/}
                {/*>*/}
                {/*{loop(gData)}*/}
                {/*</Tree>*/}
                {/*</Card>*/}
                {/*</Col>*/}
                {/*<Col xs={24} sm={24} md={24} lg={18} xl={18}>*/}
                {/*<Card style={{width: "100%", minHeight: 810,}}>*/}
                {/*<div style={sectionStyle} >*/}
                {/*<span style={{}} className="change">蠡湖变</span>*/}
                {/*</div>*/}


                {/*{this.state.nowData.map((item, index) => {*/}
                {/*return (*/}
                {/*<div key={index}>*/}
                {/*<Col key={index} xs={24} sm={24} md={24} lg={12} xl={12}>*/}
                {/*<div key={index} className="user-container">*/}
                {/*<span style={{display:"block",width:"100%",fontSize:"16px",paddingLeft:"20px",marginTop:"15px"}}>*/}
                {/*<span style={{float:"left"}}>巡检编号:{item.code}</span><span style={{float:"right",paddingRight:"20px"}}>{item.codeindex}</span>*/}
                {/*</span>*/}

                {/*<img style={{width: 610, height: 400,marginTop:"15px",paddingLeft:"20px"}} src={item.urls} alt=""/>*/}
                {/*<h3 style={{display:"block",width:"100%",fontSize:"16px",paddingLeft:"20px",marginTop:"15px"}}>*/}
                {/*<span style={{width:"10px",height:"10px",backgroundColor:"#f2ba0f",display:"block",float:"left",marginTop:"7px"}}></span>&nbsp;&nbsp;状态：{item.success}</h3>*/}
                {/*<h3 style={{display:"block",width:"100%",fontSize:"16px",paddingLeft:"20px",marginTop:"15px"}}>*/}
                {/*<span style={{width:"10px",height:"10px",backgroundColor:"#f13283",display:"block",float:"left",marginTop:"7px"}}></span>&nbsp;&nbsp;监测模式：{item.testModel}</h3>*/}
                {/*<h3 style={{display:"block",width:"100%",fontSize:"16px",paddingLeft:"20px",marginTop:"15px"}}>*/}
                {/*<span style={{width:"10px",height:"10px",backgroundColor:"#10a3e7",display:"block",float:"left",marginTop:"7px"}}></span>&nbsp;&nbsp;监测类型：{item.testType}</h3>*/}
                {/*<div className="user-test-button">*/}
                {/*<Dropdown overlay={menu}>*/}
                {/*<Button style={{float:"right",backgroundColor:"#384042",color:"#Fff"}} >*/}
                {/*操作 <Icon type="down"/>*/}
                {/*</Button>*/}
                {/*</Dropdown>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</Col>*/}
                {/*</div>*/}
                {/*)*/}
                {/*})}*/}
                {/*</Card>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                {/*</div>*/}
                {/*<Modal*/}
                {/*title="巡检详情"*/}
                {/*visible={this.state.visible}*/}
                {/*onOk={this.handleOk}*/}
                {/*width={900}*/}
                {/*bodyStyle={{height: "500px"}}*/}
                {/*onCancel={this.handleCancel}*/}
                {/*destroyOnClose={true}*/}
                {/*footer={null}*/}
                {/*>*/}
                {/*<div className="video-min">*/}
                {/*<div className="video-left">*/}
                {/*<Button onClick={this.handleOk} type="primary">返回</Button>*/}
                {/*<img src={require("../../public/index.jpg")} alt=""/>*/}
                {/*<div className="video-two-but">*/}
                {/*<Button onClick={this.handleOk} type="primary">正常</Button>*/}
                {/*<Button onClick={this.handleOk} type="primary">报告异常</Button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="video-right">*/}
                {/*<h3><span>设备编号：</span>000000</h3>*/}
                {/*<h3><span>设备类型：</span>油位表</h3>*/}
                {/*<h3><span>当前状态：</span>60 （正常）</h3>*/}
                {/*<h3><span>状态预测：</span>临近警戒线</h3>*/}
                {/*<EchartsLine*/}
                {/*Width={100}*/}
                {/*Height={100}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</Modal>*/}
            </div>
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
    actions: bindActionCreators({numberSource, loadings, changekeyData}, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Mains));

