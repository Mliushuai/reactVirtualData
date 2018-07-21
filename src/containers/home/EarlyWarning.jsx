import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {is, fromJS} from 'immutable';
import {Form, Input, Select, Row, Col, Card, Button, Modal, message} from 'antd';
import "./style/pending.css"
// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import EchartsLine from './../user/EchartsLine'
import "./style/EalyStyle.css"

const FormItem = Form.Item;
const Option = Select.Option;

class EarlyWarnings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
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
    submitSort = () => {
        message.success("添加成功！！");
        this.setState({
            visible: false,
        });
    }

    testForm() {
        const {getFieldDecorator} = this.props.form;
        const childernForm = []
        childernForm.push(
            <Form onSubmit={this.handleSubmit} key={1}>
                <div className="submitSort-button">
                    <FormItem
                        label="取消原因"
                        labelCol={{span: 10}}
                        wrapperCol={{span: 10}}
                    >
                        {getFieldDecorator(`workCause`, {
                            rules: [{
                                required: true,
                                message: 'Input something!',
                            }],
                        })(
                            <Select style={{width: 170}} onChange={this.handleChange}>
                                <Option value="1">天气原因</Option>
                                <Option value="2">时间原因</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        label="有限时长"
                        labelCol={{span: 10}}
                        wrapperCol={{span: 10}}
                    >
                        {getFieldDecorator(`workHourse`, {
                            rules: [{
                                required: true,
                                message: 'Input something!',
                            }],
                        })(
                            <Select style={{width: 170}} onChange={this.handleChange}>
                                <Option value="1">12H</Option>
                                <Option value="2">24H</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="备注说明"
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {getFieldDecorator('minArray', {
                            rules: [{required: true, message: '请输入分类编码!'}],
                        })(
                            <textarea cols="26" rows="6">

                                    </textarea>
                        )}
                    </FormItem>
                    <Button type="primary" onClick={this.submitSort}>
                        保存提交
                    </Button>
                </div>

            </Form>
        )
        return childernForm
    }

    render() {
        return (
            <div style={{width: "100%", height: "800px", backgroundColor: "#fff", marginTop: "20px"}}>
                <Bcrumb title="预警" icon="users6"/>
                <Row style={{padding: 20}}>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card style={{width: "100%", minHeight: 640, padding: 10}}>
                            <h3 className="char-tiele">预警</h3>
                            <div className="leter-min">
                                <div className="left-letter">
                                    <span>仪表读取异常</span>
                                    <span>详情</span>
                                    <span></span>
                                </div>

                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={17} xl={17}>
                        <Card style={{width: "100%", minHeight: 640, padding: 10}}>
                            <div className="test-min">
                                <Row style={{width: "100%"}}>
                                    <Col xs={24} sm={24} md={24} lg={11} xl={11} style={{marginRight: "20px"}}>
                                        <div>
                                            <h3><span>事件类型：</span><span>油位异常</span></h3>
                                            <h3><span>位置：</span><span>1电站东南</span></h3>
                                            <h3><span>设备编号：</span><span>00000000</span></h3>
                                            <img src={require("../../public/index.jpg")} width={400} alt=""/>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <div>
                                            <EchartsLine

                                            />
                                        </div>
                                    </Col>
                                    <div>
                                        <Button type="primary" size="large"
                                                onClick={this.showModal}
                                                style={{marginRight: 20, width: 120}}
                                        >详情</Button>
                                        <Button size="large"
                                                style={{marginRight: 20, width: 120}}
                                        >正常</Button>
                                    </div>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Modal
                        title="异常预警"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        width={500}
                        bodyStyle={{height: "500px"}}
                        onCancel={this.handleCancel}
                        destroyOnClose={true}
                        footer={null}
                    >
                        <div>
                            {this.testForm()}
                        </div>
                    </Modal>
                </Row>

            </div>
        )
    }
}

const EarlyWarning = Form.create()(EarlyWarnings)
export default EarlyWarning;
