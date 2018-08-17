import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import {Router, Route, IndexRoute, browserHistory, History, Link} from 'react-router';
import {numberSource, loadings} from '../../redux/action/NumberSource'
import {changekeyData} from '../../redux/action/changeKeyActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon, Row, Col, Card, Modal, Steps, Button, message, Table, Tree, Input, Spin, Pagination} from 'antd';
import RirhtTitleNav from '../../publicModule/RirhtTitleNav'
// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import Console from '../../containers/consoleControl/ConsoleControl'
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
    render() {
        const {searchValue, expandedKeys, autoExpandParent, disableds} = this.state;
        return (
            <div>
                <Row>
                    <Bcrumb title="异常警报"/>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5} className="LeftFloat">
                        <Card className="contentLeft">
                           <RirhtTitleNav
                               title={"点位点列表"}
                           />
                            {/*<div className="pagin-bottom">*/}
                                {/*<Pagination size="small" total={200} style={{textAlign: "center"}}/>*/}
                            {/*</div>*/}
                        </Card>

                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18} className="RightFloat"
                         style={{backgroundColor: "transparent"}}>
                        <div className="index-r-min">
                            <Col xs={24} sm={24} md={24} lg={11} xl={11} className="index-four-col">
                                <div className="index-four-con">
                                    <div className="index-tit-min">运行状态</div>
                                    <div className="state-four-cord">
                                        <Link to='/onekey'
                                              onClick={()=>this.GoAction('onekey')}
                                        >
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
                                        <Link to='/larum'
                                              onClick={()=>this.GoAction('larum')}>
                                        <Col xs={24} sm={24} md={12} lg={11} xl={11}
                                             style={{marginBottom: 20}}>
                                            <Card className="four-card-min">
                                                <div className="about-tit">
                                                    <div className="four-card-ball-two"></div>
                                                </div>
                                                <div className="four-about-min">
                                                    <div className="card-min-tit">{disableds ? this.props.sourceNumber.numberSource3 === 0 ? "0条" : 1 + "条" : "暂无预警"}</div>
                                                    <div className="card-min-child-tit">预警信息</div>
                                                </div>
                                            </Card>
                                        </Col>
                                        </Link>
                                        <Link to='/larum'
                                              onClick={()=>this.GoAction('larum')}>
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
                                        <Link to='/AIinspect'
                                              onClick={()=>this.GoAction('AIinspect')}>
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
                            <div style={{width:"2%",height:"380px"}}></div>
                            <Col xs={24} sm={24} md={24} lg={11} xl={11} className="index-four-col">
                                <div className="index-four-con">
                                    <div className="index-tit-min">监测状态</div>
                                    <div className="index-mon-table-first">
                                        <ul>
                                            <li>
                                                <div>辅助调控</div>
                                                <div></div>
                                                <div style={{color: "#006e6b"}}>
                                                    <span className="about-ball"
                                                          style={{backgroundColor: "#006e6b"}}></span>
                                                    <span>待处理</span>
                                                   <span>{disableds ? this.props.sourceNumber.numberSource2 === 0 ? "0条" : 1 + "条" : 0+"条"}</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div>单人操作监护</div>
                                                <div></div>
                                                <div style={{color: "#d7dada"}}>
                                                    <span className="about-ball"
                                                          style={{backgroundColor: "#d7dada"}}></span>
                                                    <span>待处理</span>
                                                    <span>1条</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div>现场作业管控</div>
                                                <div>100点位</div>
                                                <div style={{color: "#d7dada"}}>
                                                    <span className="about-ball"
                                                          style={{backgroundColor: "#d7dada"}}></span>
                                                    <span>待处理</span>
                                                    <span>1条</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div>设备智能监测</div>
                                                <div>100点位</div>
                                                <div style={{color: "#d7dada"}}>
                                                    <span className="about-ball"
                                                          style={{backgroundColor: "#d7dada"}}></span>
                                                    <span>待处理</span>
                                                    <span>0条</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div>站内外环境监测</div>
                                                <div>100点位</div>
                                                <div style={{color: "#d7dada"}}>
                                                    <span className="about-ball"
                                                          style={{backgroundColor: "#d7dada"}}></span>
                                                    <span>待处理</span>
                                                    <span>0条</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div>输电线路监测</div>
                                                <div>100点位西南1副点位</div>
                                                <div style={{color: "#d7dada"}}>
                                                    <span className="about-ball"
                                                          style={{backgroundColor: "#d7dada"}}></span>
                                                    <span>待处理</span>
                                                    <span>0条</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div>危险源点防外破</div>
                                                <div>100点位</div>
                                                <div style={{color: "#d7dada"}}>
                                                    <span className="about-ball"
                                                          style={{backgroundColor: "#d7dada"}}></span>
                                                    <span>已暂停：2  进行中：98</span>
                                                    <span>0条</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div>危险源点防外破</div>
                                                <div>100点位</div>
                                                <div style={{color: "#d7dada"}}>
                                                    <span className="about-ball"
                                                          style={{backgroundColor: "#d7dada"}}></span>
                                                    <span>已暂停：2  进行中：98</span>
                                                    <span>0条</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={11} xl={11} className="index-four-col">
                                <div className="index-four-con">
                                    <div className="index-tit-min">一个月内处理任务</div>
                                    <div style={{width:"100%",height:"89%"}}>
                                        <ChartsIndexPie/>
                                    </div>
                                </div>
                            </Col>
                            <div style={{width:"2%",height:"380px"}}></div>
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