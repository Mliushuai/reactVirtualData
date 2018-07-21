import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {bindActionCreators} from 'redux';
// import { PropTypes } from 'prop-types'
import {onDecrement, onIncrement} from '../../redux/action/counter'
import './prectice.less';
import './style.css'
import {Icon, Row, Col, Card, Modal, Steps, Button, message, Table} from 'antd';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';

/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={{width: "100%", height: "800px", backgroundColor: "#fff", marginTop: "20px"}}>
                <Bcrumb title="预案编制" icon="users"/>
                <Row style={{marginLeft:"15px"}}>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                        <Card style={{width: "100%", minHeight: 640, padding: 10}}>
                            <h3 className="char-tiele">点位列表</h3>
                            <div className="leter-min">
                                <div className="left-letter">
                                    <span>防汛预案</span>
                                </div>
                                <div className="left-letter">
                                    <span>防台风预案</span>
                                </div>
                                <div className="left-letter">
                                    <span>防台风预案</span>
                                </div>
                            </div>
                            <div style={{marginTop:"320px"}}>
                                <Button type="primary"  ><Link to="/reserve">新增</Link></Button>
                                <Button  type="primary"  style={{marginLeft:"120px"}}><Link to="/preplan">预案节点</Link></Button>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18} style={{marginLeft: 30}}>
                        <Card>
                            <div className='plan-min'>
                                <div>
                                    <h3>防汛预案</h3>
                                    <div className="flow-min">
                                        <div className="flow-chunk">警报</div>
                                        <div className="flow-long">
                                            <div className="flow-long-min"></div>
                                            <div className="flow-radius"></div>
                                        </div>
                                        <div className="flow-chunk">复合评定</div>
                                        <div className="flow-long">
                                            <div className="flow-long-min"></div>
                                            <div className="flow-radius"></div>
                                        </div>
                                        <div className="flow-chunk">启动防汛议案</div>
                                        <div className="flow-long">
                                            <div className="flow-long-min"></div>
                                            <div className="flow-radius"></div>
                                        </div>
                                        <div className="flow-chunk">简历应急通讯</div>
                                        <div className="flow-long">
                                            <div className="flow-long-min"></div>
                                            <div className="flow-radius"></div>
                                        </div>
                                        <div className="flow-chunk">通知应急小组人员</div>
                                        <div className="flow-long">
                                            <div className="flow-long-min"></div>
                                            <div className="flow-radius"></div>
                                        </div>
                                        <div className="flow-chunk">人员配置</div>
                                        <div className="flow-long">
                                            <div className="flow-long-min"></div>
                                            <div className="flow-radius"></div>
                                        </div>
                                        <div className="flow-chunk">处理</div>
                                        <div className="flow-long">
                                            <div className="flow-long-min"></div>
                                            <div className="flow-radius"></div>
                                        </div>
                                        <div className="flow-chunk">解除</div>
                                    </div>
                                </div>
                                <div>
                                    <h3>防汛应急小组成员：</h3>
                                    <div style={{width: 600, height: 190, overflow: "auto", border: "1px solid #333"}}>
                                        <div style={{padding: 10}}>
                                            <h3>组长:</h3>
                                            <h3 className="adout-min">
                                                <span>XXX</span>
                                                <span>总公</span>
                                                <span>130000000000</span>
                                                <span>备用联系方式</span>
                                                <span>123@123.com</span>
                                            </h3>
                                            <h3>成员:</h3>
                                            <h3 className="adout-min">
                                                <span>XXX</span>
                                                <span>专责</span>
                                                <span>130000000000</span>
                                                <span>备用联系方式</span>
                                                <span>123@123.com</span>
                                            </h3>
                                            <h3 className="adout-min">
                                                <span>XXX</span>
                                                <span>专责</span>
                                                <span>130000000000</span>
                                                <span>备用联系方式</span>
                                                <span>123@123.com</span>
                                            </h3>
                                            <h3 className="adout-min">
                                                <span>XXX</span>
                                                <span>专责</span>
                                                <span>130000000000</span>
                                                <span>备用联系方式</span>
                                                <span>123@123.com</span>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <Button>删除</Button>
                            </div>

                        </Card>

                    </Col>
                </Row>
            </div>
        )
    }
}


export default Main;