import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Modal,Tree,Table,Radio,Select,message,Card } from 'antd';
import styles  from './style.css'
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { Bcrumb } from '../../component/bcrumb/bcrumb';
class AdvancedSearchFormOness extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:1
        }
    }
    back=()=>{
        window.history.go(-1)
    }
    getFieldedsOne=()=>{
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const children = [];
        children.push(
            <Col span={24} key={1} >
                <FormItem label={`节点名称:`}
                          {...formItemLayout}
                          style={{marginTop:"50px"}}
                >
                    {getFieldDecorator(`Prelans`,)(
                        <Input style={{width:"400px"}}/>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={24} key={2} >
                <FormItem label={`站点:`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`PrelansZhan`)(
                        <Select
                            showSearch
                            style={{ width: 400 }}
                            placeholder="请选择站点"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="ASCIALL">ASCIALL</Option>
                            <Option value="ASCIALLS1">ASCIALLS1</Option>
                            <Option value="ASCIALLS2">ASCIALLS2</Option>
                        </Select>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={24} key={3} >
                <FormItem label={`关系人:`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`People`,)(
                        <Input style={{width:"400px"}}/>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={24} key={4} >
                <FormItem label={`消息类型:`}
                          {...formItemLayout}
                >
                        <RadioGroup value={"1"}>
                            <Radio value={"1"}>弹窗</Radio>
                            <Radio value={"2"}>短信</Radio>
                            <Radio value={"3"}>邮件</Radio>
                        </RadioGroup>
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={24} key={5} >
                <FormItem label={`是否控制类型:`}
                          {...formItemLayout}
                >
                        <RadioGroup  value={"5"}>
                            <Radio value={"5"}>是</Radio>
                            <Radio value={"6"}>否</Radio>

                        </RadioGroup>
                </FormItem>
            </Col>
        );


        return children;
    }
    render() {
        return (
            <div style={{width:"100%",height:"800px",backgroundColor:"#fff",marginTop:"20px"}}>
                <Bcrumb title="预案节点" icon="organs1" />
                <Row style={{marginLeft:"15px"}}>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                        <Card style={{width: "100%", minHeight: 640, padding: 10}}>
                            <h3 className="char-tiele">预案节点</h3>
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
                                <Button onClick={this.back} style={{marginLeft:"100px"}}>返回</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18} style={{marginLeft: 30}}>
                        <Card>
                            <div className='plan-min'>
                                <Form
                                    className="ant-advanced-search-form"
                                >
                                    <Row >{this.getFieldedsOne()}</Row>
                                </Form>

                            </div>
                            <Button style={{float:"right",marginRight:"50px"}}>完成</Button>
                            <Button style={{float:"right",marginRight:"50px"}}>删除</Button>

                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}

const AdvancedSearchFormOnes = Form.create()(AdvancedSearchFormOness);
export default AdvancedSearchFormOnes
