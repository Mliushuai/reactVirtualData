import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {bindActionCreators} from 'redux';
// import { PropTypes } from 'prop-types'
import {onDecrement, onIncrement} from '../../redux/action/counter'
import './prectice.less';
import { Form, Row, Col, Input, Button, Icon, Modal,Tree,Table,Radio,Select,message } from 'antd';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import styles  from './style.css'
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;
const Option = Select.Option;
/* 以类的方式创建一个组件 */
class Mains extends Component {
    constructor(props) {
        super(props);
        this.state={
            userID:"",
            userSource:[],
            source:[],
            wordSource:[],
            source1:[],
            videoSource:[],
            source2:[],
            visible: false,
            onDowns:[{key:1,Id:1}],
            onDownSource:[]
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    getFields() {
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
            <Col span={5} key={1} >
                <FormItem label={`预案编号`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`reserve`, {
                        rules: [{
                            required: true,
                            message: 'Input something!',
                        }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={5} key={2} >
                <FormItem label={`预案名称`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`reserveName`, {
                        rules: [{
                            required: true,
                            message: 'Input something!',
                        }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={2} key={3} >
                <FormItem label={``}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`reserveNames`)(
                        <Button onClick={this.showModal}>节点流程</Button>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={5} key={4} >
                <FormItem label={``}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`reserveNamess`)(
                        <Button onClick={this.back}>返回</Button>
                    )}
                </FormItem>
            </Col>
        );


        return children;
    }
    back=()=>{

        window.history.go(-1)
    }
    getFielded=()=>{
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
                <FormItem label={`人员ID:`}
                          {...formItemLayout}
                          style={{marginTop:"50px"}}
                >
                    {getFieldDecorator(`reserveID`,)(
                        <Select
                            showSearch
                            style={{ width: 265 }}
                            placeholder="请选择人员ID"
                            optionFilterProp="children"
                            onSelect={this.resSelect}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="张三">张三</Option>
                            <Option value="李四">李四</Option>
                            <Option value="王五">王五</Option>
                        </Select>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={24} key={2} >
                <FormItem label={`联系方式:`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`reservephone`)(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={24} key={3} >
                <FormItem label={`角色`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`reserveUsers`)(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={24} key={4} >
                <FormItem label={``}
                          {...formItemLayout}
                          style={{marginTop:"50px",marginLeft:"170px"}}
                >
                    {getFieldDecorator(`reserveUserss`)(
                        <Button  onClick={this.addSource}>添加</Button>
                    )}
                </FormItem>
            </Col>
        );
        return children;
    }
    getFieldeds=()=>{
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
                <FormItem label={`文档编码:`}
                          {...formItemLayout}
                          style={{marginTop:"50px"}}
                >
                    {getFieldDecorator(`wordID`,)(
                        <Select
                            showSearch
                            style={{ width: 265 }}
                            placeholder="请选择文档ID"
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
            <Col span={24} key={2} >
                <FormItem label={`文档名称:`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`wordName`)(
                        <Select
                            showSearch
                            style={{ width: 265 }}
                            placeholder="请选择文档"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="暴雨防范">暴雨防范</Option>
                            <Option value="暴风防范">暴风防范</Option>
                            <Option value="地震防范">地震防范</Option>
                        </Select>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={24} key={4} >
                <FormItem label={``}
                          {...formItemLayout}
                          style={{marginTop:"50px",marginLeft:"170px"}}
                >
                    {getFieldDecorator(`word`)(
                        <Button  onClick={this.addSourceWord} style={{marginTop:"65px"}}>添加</Button>
                    )}
                </FormItem>
            </Col>
        );
        return children;
    }
    getFieldedsThree=()=>{
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
                <FormItem label={`视频编号:`}
                          {...formItemLayout}
                          style={{marginTop:"50px"}}
                >
                    {getFieldDecorator(`videoID`,)(
                        <Select
                            showSearch
                            style={{ width: 265 }}
                            placeholder="请视频ID"
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
            <Col span={24} key={2} >
                <FormItem label={`信息:`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`videoIformation`)(
                        <Input/>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={24} key={4} >
                <FormItem label={``}
                          {...formItemLayout}
                          style={{marginTop:"50px",marginLeft:"170px"}}
                >
                    {getFieldDecorator(`word`)(
                        <Button  onClick={this.addSourceVideo} style={{marginTop:"65px"}}>添加</Button>
                    )}
                </FormItem>
            </Col>
        );
        return children;
    }
    resSelect=(value)=>{
        this.setState({
            userID:value,
        })
    }

    addSource=()=>{
        if(this.props.form.getFieldsValue().reserveID===undefined||this.props.form.getFieldsValue().reservephone===undefined||this.props.form.getFieldsValue().reserveUsers===undefined){
            message.error("请输入要添加的值!")

        }else{
            this.state.source.push({
                reserveID:this.props.form.getFieldsValue().reserveID,
                reservephone:this.props.form.getFieldsValue().reservephone,
                reserveUsers:this.props.form.getFieldsValue().reserveUsers,
            })
            this.setState({
                userSource:this.state.source
            })
            this.props.form.resetFields();

        }

    }
    addSourceWord=()=>{
        if(this.props.form.getFieldsValue().wordID===undefined||this.props.form.getFieldsValue().wordName===undefined){
            message.error("请输入要添加的值!")
        }else{
            this.state.source1.push({
                wordID:this.props.form.getFieldsValue().wordID,
                wordName:this.props.form.getFieldsValue().wordName,
            })
            this.setState({
                wordSource:this.state.source1
            })
            this.props.form.resetFields();
        }
    }
    addSourceVideo=()=>{
        if(this.props.form.getFieldsValue().videoID===undefined||this.props.form.getFieldsValue().videoIformation===undefined){
            message.error("请输入要添加的值!")
        }else{
            this.state.source2.push({
                videoID:this.props.form.getFieldsValue().videoID,
                videoIformation:this.props.form.getFieldsValue().videoIformation,
            })
            this.setState({
                videoSource:this.state.source2
            })
            this.props.form.resetFields();
        }
    }
    onDownUp=()=>{

        this.state.onDownSource.push({
            key:this.state.onDowns[this.state.onDowns.length-1].key+0.1,
            Id:this.state.onDowns[this.state.onDowns.length-1].key+0.1,
        })
        this.setState({
            onDowns:this.state.onDownSource
        })

    }
    onDown=()=>{
       this.state.onDowns.push({
           key:String(this.state.onDowns.length+1),
           Id:String(this.state.onDowns.length+1)
       })
        this.setState({
            onDowns:this.state.onDowns
        })
    }
    render() {
        const {userSource,wordSource,videoSource,onDowns}=this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div style={{width: "100%", height: "900px", backgroundColor: "#fff", marginTop: "20px"}}>
                <Bcrumb title="新增预案" icon="users1"/>
                <div className="reserveContent">
                <Modal
                    title="节点流程"
                    visible={this.state.visible}
                    width={800}
                     bodyStyle={{height:"900px",overflow:"auto"}}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/*{this.reserveFields()}*/}
                    <Form
                        className="ant-advanced-search-form"
                    >
                        <Row >
                            {
                                onDowns.map((item,index)=>{
                                    return (
                                        <Col span={24} key={index} >
                                            <FormItem label={String(item.key).slice(0,3)}
                                                      {...formItemLayout}
                                                      style={{marginTop:"20px"}}
                                            >
                                                {getFieldDecorator(String(item.Id))(
                                                    <Select
                                                        showSearch
                                                        style={{ width: 265 }}
                                                        placeholder="请选择节点"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                        <Option value="警报">警报</Option>
                                                        <Option value="警报1">警报1</Option>
                                                        <Option value="警报2">警报2</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                    )
                                })
                            }

                            <Col span={24} key={8.00001} >
                                <FormItem label={``}
                                          {...formItemLayout}
                                          style={{marginTop:"20px"}}
                                >
                                    <div>
                                    <Button style={{marginLeft:"190px",float:"left"}} onClick={this.onDown}>添加下级节点</Button>
                                        <Button style={{marginLeft:"60px",float:"left"}} onClick={this.onDownUp}>添加平行节点</Button>
                                    </div>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                </div>
                <Form
                    className="ant-advanced-search-form"
                >
                    <Row  style={{paddingLeft:"50px",borderBottom:"1px solid #aaa"}}>{this.getFields()}</Row>
                </Form>
                <div style={{width:"100%",height:"300px"}}>
                    <div style={{width:"500px",float:"left"}}>
                        <p style={{marginTop:"15px",marginLeft:"50px",fontSize:"18px"}}>干系人:</p>
                        <div className="reseContent">
                            {userSource.map((item,index)=>{
                                return <p key={index}><span style={{marginTop:"10px",marginLeft:"20px"}}>{item.reserveID}</span>
                                    <span style={{marginTop:"10px",marginLeft:"20px"}}>{item.reservephone}</span>
                                    <span style={{marginTop:"10px",marginLeft:"20px"}}>{item.reserveUsers}</span></p>
                            })}
                        </div>
                    </div>
                    <div style={{width:"500px",float:"left"}}>
                        <p style={{marginTop:"15px",marginLeft:"50px",fontSize:"18px"}}>相关文档:</p>
                        <div className="reseContent">
                            {wordSource.map((item,index)=>{
                                return <p key={index}>
                                    <span style={{marginTop:"10px",marginLeft:"20px"}}>{item.wordName}</span>
                                    <span style={{marginTop:"10px",marginLeft:"20px"}}>{item.wordID}</span></p>
                            })}
                        </div>
                    </div>
                    <div style={{width:"500px",float:"left"}}>
                        <p style={{marginTop:"15px",marginLeft:"50px",fontSize:"18px"}}>视频源:</p>
                        <div className="reseContent">
                            {videoSource.map((item,index)=>{
                                return <p key={index}>
                                    <span style={{marginTop:"10px",marginLeft:"20px"}}>{item.videoID}</span>
                                    <span style={{marginTop:"10px",marginLeft:"20px"}}>{item.videoIformation}</span></p>
                            })}
                        </div>
                    </div>
                </div>
                <div style={{width:"100%",height:"400px",clear:"both"}}>
                    <div className="reseContRight">
                        <Form
                            className="ant-advanced-search-form"
                        >
                            <Row >{this.getFielded()}</Row>
                        </Form>

                    </div>
                    <div className="reseContRight" style={{marginLeft:"100px"}}>
                        <Form
                            className="ant-advanced-search-form"
                        >
                            <Row >{this.getFieldeds()}</Row>
                        </Form>

                    </div>
                    <div className="reseContRight" style={{marginLeft:"100px"}}>
                        <Form
                            className="ant-advanced-search-form"
                        >
                            <Row >{this.getFieldedsThree()}</Row>
                        </Form>
                    </div>

                </div>
            </div>
        )
    }
}
const Main = Form.create()(Mains);


export default Main;