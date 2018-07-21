import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {Icon, Row, Col, Card, Modal, Steps, Button, message, Table} from 'antd';
import "./style.css"
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import LineCharts from '../charts/LineCharts'

/* 以类的方式创建一个组件 */
const columns = [{
    key: "1",
    code: '2018-05-24-001',
    meaterType: "火山警报",
    time: "2018-5-24 12:00",
    levelType: "一般",
    location: "1电站东南",
    explain: "警报——复核——警报通知——发起应急会议——应急小组到位——问题处理——警报解——事件归档"
}, {
    key: "2",
    code: '2018-08-24-001',
    meaterType: "风雨警报",
    time: "2018-8-24 12:00",
    levelType: "二级",
    location: "1电站东南",
    explain: "警报---复核---声音驱逐---人员查看"
}
];

class Lines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMin: true,
            nowData: "",
            changeKey: "",
            leftCardData: columns,
            visible: false,
            code: "",
            meaterType: "",
            time: "",
            levelType: "",
            location: "",
            explain: "",
            dataSource: [
                {
                    key: "1",
                    title: "220kV蠡湖变隧道",
                    name: "异常生物入侵"
                }, {
                    key: "2",
                    title: "330kV蠡湖变隧道",
                    name: "电闪雷鸣"
                }
            ]
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    componentDidMount() {
        const {leftCardData} = this.state;
        leftCardData.map((item, index) => {
            if (item.key === "1") {
                this.setState({
                    code: item.code,
                    time: item.time,
                    meaterType: item.meaterType,
                    levelType: item.levelType,
                    location: item.location,
                    explain: item.explain,
                    key: item.key
                })
            }
        })
    }

    ListSource = (key) => {
        this.setState({
            changeKey: key
        })
        const {leftCardData} = this.state;
        leftCardData.map((item, index) => {
            if (item.key === key) {
                this.setState({
                    code: item.code,
                    time: item.time,
                    meaterType: item.meaterType,
                    levelType: item.levelType,
                    location: item.location,
                    explain: item.explain,
                    key: item.key
                })
            }
        })
    }
    deletData = (key) => {
        let nowdata = this.state.dataSource.pop()
        if (nowdata.key == 1) {
            this.setState({
                showMin: false
            })
        }
        console.log(nowdata)
        this.setState({
            nowData: nowdata
        })
    }

    render() {
        const {dataSource, code, time, meaterType, levelType, location, explain, key} = this.state;
        return (
            <div style={{width: "100%", height: "900px", backgroundColor: "#fff", marginTop: "20px",}}>
                <Bcrumb title="应急事件" icon="users"/>
                <Row style={{padding: 20}}>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                        <Card style={{width: "100%", minHeight: 640, padding: 10}}>
                            <h3 className="char-tiele">异常列表</h3>
                            <div style={{display: this.state.showMin === true ? "block" : "none"}}>
                            <div className="leter-min">
                                {
                                    dataSource.map((item, index) => {
                                        return <p style={{
                                            display: "block",
                                            height: "25px",
                                            lineHeight: "25px",
                                            fontSize: "18px",
                                            textAlign: "center",
                                            paddingTop: "20px"
                                        }} key={index}
                                        >
                                            <span style={{width: "50%", textAlign: "left", cursor: "pointer"}}
                                                  onClick={this.ListSource.bind(this, item.key)}>{item.title}</span><span
                                            style={{width: "50%", marginLeft: "30px"}}>{item.name}</span></p>
                                    })
                                }
                            </div>
                            </div>
                            <div style={{display: this.state.showMin === true ? "none" : "block"}}>
                                <Card style={{
                                    width: "100%", minHeight: 640, padding: 10, display: "flex", justifyContent: "center"
                                    , alignItems: "center",
                                }}>
                                    <h1>异常情况已解除</h1>
                                </Card>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={17} xl={17} style={{marginLeft: "50px"}}>
                        <div style={{display: this.state.showMin === true ? "block" : "none"}}>
                            <Card style={{width: "100%", minHeight: 640, padding: 10}}>
                                <div style={{
                                    width: "30%",
                                    borderRight: "1px solid #aaa",
                                    height: "640px",
                                    float: "left"
                                }}>
                                    <p style={{fontSize: "18px", marginTop: "20px"}}>事件编号:{}</p>
                                    <p style={{fontSize: "18px", marginTop: "20px"}}>事件类型:{meaterType}</p>
                                    <p style={{fontSize: "18px", marginTop: "20px"}}>报警时间:{time}</p>
                                    <p style={{fontSize: "18px", marginTop: "20px"}}>紧急程度:{levelType}</p>
                                    <p style={{fontSize: "18px", marginTop: "20px"}}>位置:{location}</p>
                                    <p style={{fontSize: "18px", marginTop: "20px"}}>事件流程:</p>
                                    <p style={{fontSize: "18px", marginTop: "20px"}}>时间编号:{explain}</p>

                                </div>
                                <div style={{width: "65%", marginLeft: "20px", height: "640px", float: "left"}}>
                                    <img src={require("../../public/onePag.jpg")}
                                         style={{width: "80%", height: "auto", marginLeft: "25%",}}
                                         alt=""/>
                                    <div style={{width: "100%", height: "200px", clear: "both",}}>
                                        <Button
                                            style={{float: "right", marginTop: "130px", marginRight: "20px"}}
                                            onClick={this.deletData.bind(this, key)}
                                            type="primary"
                                        >异常解除</Button>
                                        <Button
                                            style={{float: "right", marginTop: "130px", marginRight: "20px"}}
                                            onClick={this.showModal}
                                            type="primary"
                                        >历史</Button>
                                    </div>

                                </div>
                            </Card>
                        </div>
                        <div style={{display: this.state.showMin === true ? "none" : "block"}}>
                            <Card style={{
                                width: "100%", minHeight: 640, padding: 10, display: "flex", justifyContent: "center"
                                , alignItems: "center",
                            }}>
                                <h1>异常情况已解除</h1>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Modal
                    title="油位变化"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    width={600}
                    style={{textAlign: "center", height: "600px"}}
                    footer={[<Button key="submit" onClick={this.handleOk}>取消</Button>]}

                >
                    <div style={{width: '100%', height: 560}}>
                        <div style={{width: '100%', height: 460}}>
                            <LineCharts></LineCharts>
                        </div>
                        <div style={{width: '100%', height: 60}} className="show-charts-butt">
                            <Button className="show-charts-butt" type="primary">7天</Button>
                            <Button className="show-charts-butt" type="primary">3天</Button>
                            <Button className="show-charts-butt" type="primary">24小时</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Lines;
