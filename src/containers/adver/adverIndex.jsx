import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {Form, Row, Col, Input, Button, Select, DatePicker, Table, Modal} from 'antd';
// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import styles from './style.less';

const Option = Select.Option;
const FormItem = Form.Item;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
import LongBan from '../image/img2.jpg'

const longBan = {
    width: "100%",
    height: "64px",
    backgroundImage: `url(${LongBan})`,
    borderBottom: "1px solid #d6e1e4",
};

/* 以类的方式创建一个组件 */
class Advers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    onChange = (date, dateString) => {
        console.log(date, dateString);
    }
    getFields = () => {

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        const children = [];
        const keys = [
            {title: "时间段", dataIndex: "code", key: "code"},
            {title: "类型", dataIndex: "status", key: "status"},
        ];
        children.push(
            <Col xl={8} lg={24} style={{textAlign: 'right', float: "left", marginTop: 16}} key="btn1">
                <FormItem
                    {...formItemLayout}
                    label="时间段:"
                >
                    <RangePicker onChange={this.onChange}
                                 style={{width: "400px"}}
                    />
                </FormItem>
            </Col>
        )
        children.push(
            <Col xl={4} lg={4} style={{textAlign: 'center', float: "left", marginTop: 16, marginLeft: "200px"}}
                 key="input">
                <Input/>
            </Col>
        )
        children.push(
            <Col xl={8} lg={24} style={{textAlign: 'left', float: "left", marginTop: 16, paddingLeft: "100px"}}
                 key="btn">
                <Button type="primary" htmlType="submit">搜索</Button>
                <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                    清空
                </Button>
            </Col>
        )

        return children;
    };
    //搜索、标题栏
    getFieldsed = () => {

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };
        const children = [];
        children.push(
            <Col style={{textAlign: 'right', float: "left"}} key="btn5">
                <FormItem
                    {...formItemLayout}
                    label="事件名称:"
                >
                    <Input/>
                </FormItem>
            </Col>
        )
        children.push(
            <Col style={{textAlign: 'right', float: "left"}} key="btn4">
                <FormItem
                    {...formItemLayout}
                    label="事件编号:"
                >
                    <Input/>
                </FormItem>
            </Col>
        )
        children.push(
            <Col style={{textAlign: 'right', float: "left"}} key="btn3">
                <FormItem
                    {...formItemLayout}
                    label="事件类型:"
                >
                    <Input/>
                </FormItem>
            </Col>
        )
        children.push(
            <Col style={{textAlign: 'right', float: "left"}} key="btn2">
                <FormItem
                    {...formItemLayout}
                    label="发起人:"
                >
                    <Input/>
                </FormItem>
            </Col>
        )
        children.push(
            <Col style={{textAlign: 'right', float: "left"}} key="btn6">
                <FormItem
                    {...formItemLayout}
                    label="发起时间:"
                >
                    <Input/>
                </FormItem>
            </Col>
        )
        children.push(
            <Col style={{textAlign: 'right', float: "left"}} key="btn7">
                <FormItem
                    {...formItemLayout}
                    label="预案相应时间:"
                >
                    <Input/>
                </FormItem>
            </Col>
        )
        children.push(
            <Col style={{textAlign: 'right', float: "left"}} key="btn8">
                <FormItem
                    {...formItemLayout}
                    label="时间结束时间:"
                >
                    <Input/>
                </FormItem>
            </Col>
        )
        children.push(
            <Col style={{textAlign: 'right', float: "left"}} key="btn9">
                <FormItem
                    {...formItemLayout}
                    label="时间说明:"
                >
                    <Input/>
                </FormItem>
            </Col>
        )


        return children;
    };
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
    }

    render() {
        const columns = [{
            title: '事件编号',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '事件类型',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '时间',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '地点',
            dataIndex: 'action',
            key: 'action'
        }, {
            title: '状态',
            dataIndex: 'action1',
            key: 'action1'
        }, {
            title: '处理人',
            dataIndex: 'action2',
            key: 'action2'
        }, {
            title: '历史记录',
            key: 'action3', render: (text, record, index) => {
                return <Button onClick={() => {
                    this.showModal()
                }}>查看</Button>
            }
        }];
        const data = [];
        return (
            <div style={longBan}>
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
                >
                    <Row>
                        {this.getFields()}
                    </Row>

                </Form>
                <div style={{width: "100%", minHeight: "700px", backgroundColor: "#Fff"}}>
                    <Table columns={columns} dataSource={data} style={{backgroundColor: "#fff"}}/>
                </div>
                <Modal
                    title="历史记录"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    width={1200}
                    bodyStyle={{height: "700px"}}
                    onCancel={this.handleCancel}
                >
                    <div style={{width: "300px", height: "600px", float: "left",}}>
                        <Form
                            className="ant-advanced-search-form"
                        >
                            <Row gutter={24} style={{marginTop: '15px'}}>
                                {this.getFieldsed()}
                            </Row>

                        </Form>
                    </div>
                    <div style={{width: "850px", height: "600px", float: "left",}}>
                        <div style={{width: "850px", height: "300px",}}>
                            <div className="Command">
                                <div className="Command-Pic">
                                    <img src={require("./image/timg (1).jpg")} alt=""
                                         style={{width: "400px", height: "200px"}}/>
                                </div>
                                <Button className="Command-But">播放</Button>
                            </div>
                            <div className="Command">
                                <div className="Command-Pic">
                                    <img src={require("./image/timg.jpg")} style={{width: "400px", height: "200px"}}/>
                                </div>
                                <Button className="Command-But">播放</Button>
                            </div>
                        </div>
                        <div style={{width: "850px", height: "300px",}}>
                            <div className="Command1" style={{marginLeft: "25px"}}>
                                <div className="Command-Pic1">
                                    <p style={{height: "50px", textAlign: "center", fontSize: "15px"}}>参与人员:</p>
                                </div>
                            </div>
                            <div className="Command1">
                                <div className="Command-Pic1">
                                    <p style={{height: "50px", textAlign: "center", fontSize: "15px"}}>调用文档记录:</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button style={{marginLeft: "50%", marginTop: "20px"}}>下载事件记录</Button>
                </Modal>

            </div>
        );
    }
}

const Adver = Form.create()(Advers);
export default Adver


