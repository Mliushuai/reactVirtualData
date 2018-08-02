import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import {Router, Route, IndexRoute, browserHistory, History, Link} from 'react-router';
import {numberSource, loadings} from '../../redux/action/NumberSource'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import styles from './style/home.less';
import "../../public/css/publicStyle.css"
import '../../style/left.less';
import '../home/style/style.css'
import {Icon, Row, Col, Card, Modal, Steps, Button, message, Table, Tree, Input, Spin} from 'antd';
import someMethod from '../../containers/home/method'
import './../image/public.css'
import BackgroundImage from '../image/img3.jpg';
import Backgrounds from '../image/img2.jpg';

const sectionStyles = {
    width: "100%",
    height: "60px",
    backgroundImage: `url(${BackgroundImage})`,

};
const sectionStyle = {
    width: "100%",
    height: "80px",
    float: "left",
    backgroundImage: `url(${Backgrounds})`,
    backgroundSize: "100% 100%"
};
const Step = Steps.Step;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

/* 以类的方式创建一个组件 */

/**
 * 树结构搜索
 */

function getNowFormatDate() {
    let date = new Date();
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
    let currentdate = year + seperator1 + month + seperator1 + strDate;
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
            pathsUrl: '/general/button',
            children: [{title: "电力", key: "电力"}]
        }, {
            title: "蠡湖变",
            key: "蠡湖变",
            pathsUrl: '/general/button',
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

class Mains extends Component {
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
            showData: currentdate,
            disabled: false,

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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    componentDidMount() {
        this.LinkHome()
        setTimeout(
            this.tests
            , 3000)
    }

    tests = () => {
        const {actions} = this.props;
        actions.loadings(true)
        this.setState({
            disableds: true,
            disabled: true,
        })
    }
    LinkHome=()=>{
        browserHistory.push('/general')
    }

    render() {
        const {searchValue, expandedKeys, autoExpandParent, disableds} = this.state;
        const loop = data =>
            data.map(item => {
                const index = item.title.indexOf(searchValue);
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <Link to={item.pathsUrl} style={{color: "#333"}}>
                            <span>{beforeStr}<span style={{color: "#f50"}}>{searchValue}</span>{afterStr}</span>
                        </Link>
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
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card style={{width: "100%", minHeight: 810}}>
                            <div style={sectionStyles}>
                                <h3 className="publicTitle">点位列表</h3>
                            </div>
                            <Search
                                style={{marginBottom: 8, marginLeft: "20px", marginTop: "25px", width: "90%"}}
                                placeholder="请输入要搜索的点位"
                                onChange={this.onChange}
                            />
                            <Tree
                                onExpand={this.onExpand}
                                expandedKeys={expandedKeys}
                                autoExpandParent={autoExpandParent}
                                style={{marginLeft: "16px"}}
                            >
                                {loop(gData)}
                            </Tree>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                        <Card style={{width: "100%", minHeight: 810}}>
                            <div style={sectionStyle}>
                                <span className="publicChange">总体状态</span>
                            </div>
                            <div style={{width: "100%", height: "728px", marginTop: "80px"}}>
                                <div style={{
                                    width: "50%",
                                    height: "363px",
                                    float: "left",
                                    borderBottom: "2px solid #eee",
                                    borderRight: "2px solid #eee"
                                }}>
                                    <span style={{
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: "#98d023",
                                        display: "block",
                                        float: "left",
                                        marginTop: "80px",
                                        marginLeft: "30%"
                                    }}></span>
                                    <p style={{
                                        color: "#000",
                                        fontSize: "50px",
                                        marginBottom: "0",
                                        marginTop: "100px",
                                        textAlign: "center"
                                    }}>
                                        {disableds ? this.props.sourceNumber.numberSource2 === 0 ? "0条" : 1 + "条" : "暂无工票"}
                                    </p>
                                    <p style={{fontSize: "20px", margin: "0", textAlign: "center", marginTop: "20px"}}>
                                        待处理工票</p>
                                    <Link to='/onekey'>
                                        <Button style={{
                                            display: "block", margin: "0 auto",
                                            marginTop: "35px", width: "150px", height: "40px",
                                            backgroundColor: "#384042", color: "#fff"
                                        }}>进入</Button>
                                    </Link>
                                </div>
                                <div style={{
                                    width: "50%",
                                    height: "363px",
                                    float: "left",
                                    borderBottom: "2px solid #eee"
                                }}>
                                    <span style={{
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: "#e410e7",
                                        display: "block",
                                        float: "left",
                                        marginTop: "80px",
                                        marginLeft: "30%"
                                    }}></span>
                                    <p style={{
                                        color: "#000",
                                        fontSize: "50px",
                                        marginBottom: "0",
                                        marginTop: "100px",
                                        textAlign: "center"
                                    }}>
                                        {disableds ? this.props.sourceNumber.numberSource3 === 0 ? "0条" : 1 + "条" : "暂无异常"}
                                    </p>
                                    <p style={{fontSize: "20px", margin: "0", textAlign: "center", marginTop: "20px"}}>
                                        环境异常</p>
                                    <Link to='/larum'>
                                        <Button style={{
                                            display: "block", margin: "0 auto",
                                            marginTop: "35px", width: "150px", height: "40px",
                                            backgroundColor: "#384042", color: "#fff"
                                        }}>进入</Button>
                                    </Link>
                                </div>
                                <div style={{
                                    width: "50%",
                                    height: "363px",
                                    float: "left",
                                    borderRight: "2px solid #eee"
                                }}>
                                    <span style={{
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: "#f13283",
                                        display: "block",
                                        float: "left",
                                        marginTop: "80px",
                                        marginLeft: "30%"
                                    }}></span>
                                    <p style={{
                                        color: "#000",
                                        fontSize: "50px",
                                        marginBottom: "0",
                                        marginTop: "100px",
                                        textAlign: "center"
                                    }}>
                                        {disableds ? this.props.sourceNumber.numberSource2 === 0 ? "0条" : 0 + "条" : "暂无预警"}
                                    </p>
                                    <p style={{fontSize: "20px", margin: "0", textAlign: "center", marginTop: "20px"}}>
                                        预警信息</p>
                                    <Link to='/larum'>
                                        <Button style={{
                                            display: "block", margin: "0 auto",
                                            marginTop: "35px", width: "150px", height: "40px",
                                            backgroundColor: "#384042", color: "#fff"
                                        }}>进入</Button>
                                    </Link>
                                </div>
                                <div style={{width: "50%", height: "363px", float: "left"}}>
                                    <span style={{
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: "#10a3e7",
                                        display: "block",
                                        float: "left",
                                        marginTop: "80px",
                                        marginLeft: "30%",
                                        float: "left"
                                    }}></span>
                                    <span style={{display: "block", margin: "0 auto", marginTop: "75px"}}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        当前覆盖200个站点</span>
                                    <p style={{
                                        color: "#000",
                                        fontSize: "50px",
                                        marginBottom: "0",
                                        marginTop: "0px",
                                        textAlign: "center"
                                    }}>
                                        进行中
                                    </p>
                                    <p style={{fontSize: "20px", margin: "0", textAlign: "center", marginTop: "20px"}}>
                                        智能巡检</p>
                                    <Link to='/AIinspect'>
                                        <Button style={{
                                            display: "block", margin: "0 auto",
                                            marginTop: "35px", width: "150px", height: "40px",
                                            backgroundColor: "#384042", color: "#fff"
                                        }}>进入</Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </Col>

                </Row>
            </div>
        );
    }
}

// 将 state 作为 props 绑定到 Product 上。
const mapStateToProps = (state, ownProps) => {
    const {sourceNumber} = state
    return {
        sourceNumber: sourceNumber,
        state
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({numberSource, loadings}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Mains);