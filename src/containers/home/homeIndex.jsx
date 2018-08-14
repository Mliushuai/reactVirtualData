import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import {Router, Route, IndexRoute, browserHistory, History, Link} from 'react-router';
import {numberSource, loadings} from '../../redux/action/NumberSource'
import {changekeyData} from '../../redux/action/changeKeyActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../../component/style/RightTitltNav.css'
import {Icon, Row, Col, Card, Modal, Steps, Button, message, Table, Tree, Input, Spin, Pagination} from 'antd';
// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';
/**
 * css样式
 */
import "../../public/css/publicStyle.css"
import '../../component/style/public.less'
import '../../style/left.less';
import '../home/style/style.css'
import '../home/style/homeIndex.css'
import someMethod from '../../containers/home/method'
import './../image/public.css'
import ChartsIndexPie from './ChartsIndexPie'

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
            changeNav: true,// index列表导航一级标签控制
            changeNavChild: true// index列表导航二级标签控制
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
    GoAction=(changeData)=>{
        const {actions} = this.props;
        actions.changekeyData(changeData,"")
    }
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
    }

    render() {
        const {searchValue, expandedKeys, autoExpandParent, disableds} = this.state;
        console.log(disableds)
        return (
            <div>
                <Row>
                    <Bcrumb title="异常警报"/>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5} className="LeftFloat">
                        <Card className="contentLeft">
                            <div className="left-min">
                                <div>
                                    <h3 className="Exception">点位点列表</h3>
                                </div>
                                <div className="box-index-min">
                                    {/*主标题*/}
                                    <div className='box-index-min-tit'>
                                        <span>220KV青海变隧道</span>
                                        <Icon type="down"
                                              onClick={this.navChange}
                                              style={{display: this.state.changeNav ? "block" : "none"}}
                                        />
                                        <Icon type="up"
                                              onClick={this.navChangeUp}
                                              style={{display: this.state.changeNav ? "none" : "block"}}
                                        />
                                        {/*二级标题*/}
                                    </div>
                                    <div style={{display: this.state.changeNav ? "none" : "block"}}>
                                        <div className='box-index-min-childTit'>
                                            <span className="box-index-tit-min">#1主变(3点位)</span>
                                            <Icon type="down"
                                                  onClick={this.changeNavChild}
                                                  style={{display: this.state.changeNavChild ? "block" : "none"}}
                                            />
                                            <Icon type="up"
                                                  onClick={this.changeNavChildUp}
                                                  style={{display: this.state.changeNavChild ? "none" : "block"}}
                                            />
                                        </div>
                                        {/*三级内容*/}
                                        <div className='box-index-min-about'
                                             style={{display: this.state.changeNavChild ? "none" : "block"}}>
                                            <div className='box-index-min-tit-about'>
                                                <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                            </div>
                                            <div className='box-index-min-tit-about'>
                                                <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                            </div>
                                            <div className='box-index-min-tit-about'>
                                                <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pagin-bottom">
                                <Pagination size="small" total={200} style={{textAlign: "center"}}/>
                                <span style={{display: "block", textAlign: "right", marginRight: "34px"}}>共200条</span>
                            </div>
                        </Card>

                    </Col>
                    <Col xs={23} sm={23} md={23} lg={18} xl={18} className="RightFloat"
                         style={{backgroundColor: "transparent"}}>
                        <div className="index-r-min">
                            <Col xs={24} sm={24} md={24} lg={11} xl={11} className="index-four-col">
                                <div className="index-four-con">
                                    <div className="index-tit-min">运行状态</div>
                                    <div className="state-four-cord">
                                        <Link to='/onekey'>
                                        <Col xs={24} sm={24} md={12} lg={11} xl={11}
                                             style={{marginRight: "5%", marginBottom: 20}}>
                                            <Card className="four-card-min">
                                                <div className="about-tit">
                                                    <div className="four-card-ball"></div>
                                                </div>
                                                <div className="four-about-min">
                                                    <div className="card-min-tit">{disableds ? this.props.sourceNumber.numberSource2 === 0 ? "0条" : 1 + "条" : "暂无工票"}</div>
                                                    <div className="card-min-child-tit">待处理工票</div>
                                                </div>
                                            </Card>
                                        </Col>
                                        </Link>
                                        <Link to='/larum'>
                                        <Col xs={24} sm={24} md={12} lg={11} xl={11}
                                             style={{marginBottom: 20}}>
                                            <Card className="four-card-min">
                                                <div className="about-tit">
                                                    <div className="four-card-ball-two"></div>
                                                </div>
                                                <div className="four-about-min">
                                                    <div className="card-min-tit">{disableds ? this.props.sourceNumber.numberSource2 === 0 ? "0条" : 0 + "条" : "暂无预警"}</div>
                                                    <div className="card-min-child-tit">预警信息</div>
                                                </div>
                                            </Card>
                                        </Col>
                                        </Link>
                                        <Link to='/larum'>
                                        <Col xs={24} sm={24} md={12} lg={11} xl={11}
                                             style={{marginRight: "5%", marginBottom: 20}}>
                                            <Card className="four-card-min">
                                                <div className="about-tit">
                                                    <div className="four-card-ball-three"></div>
                                                </div>
                                                <div className="four-about-min">
                                                    <div className="card-min-tit">{disableds ? this.props.sourceNumber.numberSource2 === 0 ? "0条" : 0 + "条" : "暂无预警"}</div>
                                                    <div className="card-min-child-tit">环境异常</div>
                                                </div>
                                            </Card>
                                        </Col>
                                        </Link>
                                        <Link to='/AIinspect'>
                                        <Col xs={24} sm={24} md={12} lg={11} xl={11}
                                             style={{marginBottom: 20}}>
                                            <Card className="four-card-min">
                                                <div className="about-tit">
                                                    <div className="four-card-ball-four"></div>
                                                    <span className="four-card-ball-four-tit">当前覆盖200点位</span>
                                                </div>
                                                <div className="four-about-min">
                                                    <div className="card-min-tit">进行中</div>
                                                    <div className="card-min-child-tit">智能巡检</div>
                                                </div>
                                            </Card>
                                        </Col>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={11} xl={11} className="index-four-col">
                                <div className="index-four-con">
                                    <div className="index-tit-min">监测状态</div>
                                    <div className="index-mon-table-first">
                                        <ul>
                                            <li>
                                                <div>辅助</div>
                                                <div>100点位</div>
                                                <div style={{color: "#006e6b"}}>
                                                    <span className="about-ball"
                                                          style={{backgroundColor: "#006e6b"}}></span>
                                                    <span>待处理</span>
                                                   <span>{disableds ? this.props.sourceNumber.numberSource2 === 0 ? "0条" : 1 + "条" : 0+"条"}</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div>辅助</div>
                                                <div>100点位</div>
                                                <div style={{color: "#d7dada"}}>
                                                    <span className="about-ball"
                                                          style={{backgroundColor: "#d7dada"}}></span>
                                                    <span>待处理</span>
                                                    <span>1条</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div>辅助</div>
                                                <div>100点位</div>
                                                <div style={{color: "#d7dada"}}>
                                                    <span className="about-ball"
                                                          style={{backgroundColor: "#d7dada"}}></span>
                                                    <span>待处理</span>
                                                    <span>1条</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={11} xl={11} className="index-four-col">
                                <div className="index-four-con">
                                    <div className="index-tit-min">一个月内处理任务</div>
                                    <div style={{width:"100%",height:"100%"}}>
                                        <ChartsIndexPie/>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={11} xl={11} className="index-four-col">
                                <div className="index-four-con">
                                    <div className="index-tit-min">历史异常记录</div>
                                    <div className="index-mon-table">
                                        <ul>
                                            <li>
                                                <div>2018-06-01-001</div>
                                                <div>蠡湖变</div>
                                                <div>异常生物</div>
                                                <div>已解除</div>
                                                <div>查看</div>
                                            </li>
                                            <li>
                                                <div>2018-06-01-001</div>
                                                <div>蠡湖变</div>
                                                <div>异常生物</div>
                                                <div>已解除</div>
                                                <div>查看</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Mains);