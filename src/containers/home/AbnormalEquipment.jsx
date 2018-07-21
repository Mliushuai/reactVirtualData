import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {is, fromJS} from 'immutable';
import {Form, Input, Select, Row, Col, Card, Button, Modal, Radio} from 'antd';
import "./style/pending.css"
// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';

class AbnormalEquipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    showModal = () => {
        console.log("11111")
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

    render() {
        return (
            <div style={{width: "100%", height: "800px", backgroundColor: "#fff", marginTop: "20px"}}>
                <Bcrumb title="设备运转状态" icon="users"/>
                <Row style={{padding: 20}}>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card style={{width: "100%", minHeight: 640, padding: 10}}>
                            <h3 className="char-tiele">异常设备</h3>
                            <div className="leter-min">
                                <div className="left-letter">
                                    <span>仪表读取异常</span>
                                    <span>详情</span>
                                </div>
                                <div className="left-letter">
                                    <span>视频设备异常</span>
                                    <span>详情</span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={17} xl={17}>
                        <Card style={{width: "100%", minHeight: 640, padding: 10}}>
                            <div className="test-min">
                                <div className="right-min">
                                    <img src={require("../../public/index.jpg")}
                                         style={{width:"100%", mHeight:"500px"}}
                                         alt=""/>
                                </div>
                            </div>
                        </Card>

                    </Col>
                </Row>

            </div>
        )
    }
}

export default AbnormalEquipment