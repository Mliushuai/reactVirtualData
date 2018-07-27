import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Modal,Tree,Table,Radio,Select,message } from 'antd';
import styles  from './style.less'
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { Bcrumb } from '../../component/bcrumb/bcrumb';
class AdvancedSearchForm extends Component {
    constructor(props) {
        super(props);
        const columns = [{
            title: '工号',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        }, {
            title: '姓名',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '角色',
            dataIndex: 'address',
            key: 'address',
        },{
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone',
        },{
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '操作',
            key: 'dom',
            render: (text, record) => (
                <Button onClick={()=>this.showAdd("edit",record)}>查看</Button>
            )
        },{
            title: '编辑',
            key: 'action',
            render: (text, record) => (
                <Button onClick={()=>this.showAdd("edit1",record)}>编辑</Button>
            )
        }];
        const data = [{
            key: '1',
            name: '1223456789',
            age: '张三',
            address: '管理人员',
            phone:'15658119971',
            email:'664369260@qq.com',
            status:'正常',
        }, {
            key: '2',
            name: '1223456789',
            age: '李四',
            address: '管理人员',
            phone:'15658119971',
            email:'664369260@qq.com',
            status:'正常',
        }, {
            key:'3',
            name: '1223456789',
            age: '王五',
            address: '管理人员',
            phone:'15658119971',
            email:'664369260@qq.com',
            status:'正常',
        }];
        const treeData = [{
            title: '蒙东电力xxxx',
            key: '0-0',
            children: [{
                title: '运检一处',
                key: '0-0-0',
                children: [
                    { title: '一配电站', key: '0-0-0-0' },
                ],
            }],
        }];
        this.state={
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
            treeData:treeData,
            visible: false,
            expand: false,
            columns:columns,
            data:data,
            type:"1",
            disabled:false,
            titleType:"",
            visibles: false,
            peopleAdd:"",
            value: "one",
            values:"ones",
            modalKey:"",
            butVisible:true,
            sourceType:"",
            record:""
        }

    }
    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }
    showModals=()=>{
        this.handleReset()
        this.setState({
            visible: true,
            disabled:false,
            titleType:"组织新增"
        });
    }
    showModal = () => {
        switch(this.state.type){
            case '1':
                this.props.form.setFields({
                    organ:{
                        value:"02-03-03",
                    },organName:{
                        value:"蒙东XXXXX"
                    },organMen:{
                        value:""
                    },organPel:{
                        value:"张三"
                    },organPhone:{
                        value:"李四"
                    },organNumber:{
                        value:"15658115654"
                    },organEmail:{
                        value:"123@163.com"
                    }
                })
                break;
            case '0-0':
                this.props.form.setFields({
                    organ:{
                        value:"02-03-03",
                    },organName:{
                        value:"蒙东XXXXX"
                    },organMen:{
                        value:""
                    },organPel:{
                        value:"张三"
                    },organPhone:{
                        value:"李四"
                    },organNumber:{
                        value:"15658115654"
                    },organEmail:{
                        value:"123@163.com"
                    }
                })
                break;
            case '0-0-0':
                this.props.form.setFields({
                    organ:{
                        value:"02-03-03",
                    },organName:{
                        value:"运检一处"
                    },organMen:{
                        value:"蒙东XXXXX"
                    },organPel:{
                        value:"张三"
                    },organPhone:{
                        value:"李四"
                    },organNumber:{
                        value:"15658115654"
                    },organEmail:{
                        value:"123@163.com"
                    }
                })
                break;
            default:
                this.props.form.setFields({
                    organ:{
                        value:"01-02-03",
                    },organName:{
                        value:"一配电站"
                    },organMen:{
                        value:"运检一处"
                    },organPel:{
                        value:"张三"
                    },organPhone:{
                        value:"李四"
                    },organNumber:{
                        value:"15658115654"
                    },organEmail:{
                        value:"123@163.com"
                    }
                })
        }
        this.setState({
            visible: true,
            disabled:true,
            titleType:"组织编辑"
        });
    }

    handleOk = (e) => {
        this.handleReset()
        this.setState({
            visible: false,
        });

    }

    handleCancel = (e) => {
        console.log(e);
        this.handleReset()
        this.setState({
            visible: false,
        });

    }

    // 新增
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
                <Col span={24} key={1} >
                    <FormItem label={`组织编号`}
                              {...formItemLayout}
                    >
                        {getFieldDecorator(`organ`, {
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
            <Col span={24} key={2} >
                <FormItem label={`组织名称`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`organName`, {
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
            <Col span={24} key={3} >
                <FormItem label={`上级部门`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`organMen`, {
                        rules: [{
                            required: true,
                            message: 'Input something!',
                        }],
                    })(
                        <Input  disabled={this.state.disabled}/>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={24} key={4} >
                <FormItem label={`负责人`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`organPel`, {
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
            <Col span={24} key={5} >
                <FormItem label={`联系人`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`organPhone`, {
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
            <Col span={24} key={6} >
                <FormItem label={`电话/手机`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`organNumber`, {
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
            <Col span={24} key={7} >
                <FormItem label={`邮箱地址`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`organEmail`, {
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
        return children;
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    onChanges = (e) => {
        this.setState({
            values: e.target.value,
        });
    }
    handleChange=(value)=>{

    }
    //编辑
    getFieldsed() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const children = [];
        children.push(
            <Col span={15} key={11} >
                <FormItem label={`工号`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`addNum`, {
                        rules: [{
                            required: true,
                            message: '请输入工号!',
                        }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={15} key={12} >
                <FormItem label={`姓名`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`AddName`, {
                        rules: [{
                            required: true,
                            message: '请输入姓名!',
                        }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={15} key={13} >
                <FormItem label={`性别`}
                          {...formItemLayout}
                >
                    <RadioGroup  onChange={this.onChange} value={this.state.value}>
                        <Radio value="one">男</Radio>
                        <Radio value="two">女</Radio>
                    </RadioGroup>
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={15} key={14} >
                <FormItem label={`所属部门`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`AddMen`, {
                        rules: [{
                            required: true,
                            message: '请输入所属部门!',
                        }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={15} key={15} >
                <FormItem label={`权限`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`AddJurisdiction`, {
                        rules: [{
                            required: true,
                            message: '选择权限',
                        }],
                    })(
                        <Select  style={{ width: 265 }} onChange={this.handleChange}>
                            <Option value="管理人员">管理人员</Option>
                            <Option value="运检人员">运检人员</Option>
                            <Option value="普通用户">普通用户</Option>
                        </Select>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={15} key={16} >
                <FormItem label={`电话/手机`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`AddNumber`, {
                        rules: [{
                            required: true,
                            message: '请输入手机号!',
                        }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={15} key={17} >
                <FormItem label={`邮箱地址`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`AddEmail`, {
                        rules: [{
                            required: true,
                            message: '请输入邮箱!',
                        }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={15} key={18} >
                <p style={{margin:"0 auto",lineHeight:"63px"}}>安全信息:</p>
                <FormItem label={`账户状态`}
                          {...formItemLayout}
                >
                       <RadioGroup  onChange={this.onChanges} value={this.state.values}>
                            <Radio value="ones">未启动</Radio>
                            <Radio value="twos">启动</Radio>
                        </RadioGroup>

                </FormItem>
            </Col>
        );
        children.push(
            <Col span={15} key={19} >
                <p style={{margin:"0 auto",lineHeight:"63px",color:"blue",cursor:"pointer"}}>重置密码</p>

            </Col>
        );
        return children;
    }
    componentDidMount(){
    }
    showAdd=(type,record)=>{
        if(type==="add"){
            this.setState({
                visibles:true,
                butVisible:true,
                peopleAdd:"人员新增",
                sourceType:"add",
            })

        }else if(type==="edit"){
            this.setState({
                visibles:true,
                peopleAdd:"人员查看",
                butVisible:false,
                sourceType:"edit",
            })
            this.props.form.setFields({
                addNum:{
                    value:record.name,
                },AddName:{
                    value:record.age,
                },AddJurisdiction:{
                    value:record.address,
                },AddNumber:{
                    value:record.phone,
                },AddEmail:{
                    value:record.email,
                },AddMen:{
                    value:"蒙东"
                }
            })
        }else if(type==="edit1"){
            this.setState({
                visibles:true,
                butVisible:true,
                peopleAdd:"人员编辑",
                sourceType:"edit1",
                record:record
            })
            this.props.form.setFields({
                addNum:{
                    value:record.name,
                },AddName:{
                    value:record.age,
                },AddJurisdiction:{
                    value:record.address,
                },AddNumber:{
                    value:record.phone,
                },AddEmail:{
                    value:record.email,
                },AddMen:{
                    value:"蒙东"
                }
            })
        }
    }
    handleOks = () => {
        this.handleReset()
        this.setState({
            visibles: false,
        });

    }

    handleCancels = () => {
        this.handleReset()
        this.setState({
            visibles: false,
        });

    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        this.setState({
            type:selectedKeys[0],
        })

    }

    handleSave=()=>{
        this.state.data.map((item,index)=>{
            if(item.key===this.state.record.key){
                console.log("找到了")
                this.state.data[item.key-1]={
                    key:this.state.record.key,
                    name: this.props.form.getFieldsValue().addNum,
                    age: this.props.form.getFieldsValue().AddName,
                    address: this.props.form.getFieldsValue().AddJurisdiction,
                    phone:this.props.form.getFieldsValue().AddNumber,
                    email:this.props.form.getFieldsValue().AddEmail,
                    status:'正常',
                }
            }
        })
        this.handleCancels()
        message.success("编辑人员成功!")

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
            }
        });
        this.state.data.push({
            key:this.state.data.length+1,
            name: this.props.form.getFieldsValue().addNum,
            age: this.props.form.getFieldsValue().AddName,
            address: this.props.form.getFieldsValue().AddJurisdiction,
            phone:this.props.form.getFieldsValue().AddNumber,
            email:this.props.form.getFieldsValue().AddEmail,
            status:'正常',
        })
        this.handleCancels()
        message.success("新增人员成功!")
    };
    //树结构编写
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }
    render() {
        return (
            <div style={{width:"100%",height:"800px",backgroundColor:"#fff",marginTop:"20px"}}>
                <Bcrumb title="组织人员管理" icon="organ" />
                <div className="contentLeft">
                    <p className="organ">组织架构
                        <Icon type="plus-circle"
                              style={{float:"right",color:"blue",lineHeight:"50px",cursor:"pointer",paddingRight:"10px"}}
                            onClick={this.showModals}
                        />
                        <Icon type="form"
                              style={{float:"right",color:"blue",lineHeight:"50px",cursor:"pointer",paddingRight:"10px"}}
                              onClick={this.showModal}
                        />
                    </p>
                    <div className="Trees">
                        <Tree
                            onExpand={this.onExpand}
                            expandedKeys={this.state.expandedKeys}
                            autoExpandParent={this.state.autoExpandParent}
                            checkedKeys={this.state.checkedKeys}
                            onSelect={this.onSelect}
                            selectedKeys={this.state.selectedKeys}

                        >
                            {this.renderTreeNodes(this.state.treeData)}
                        </Tree>
                    </div>
                </div>
                <div className="contentRight">
                    <div className="RightTitle">
                        <Button style={{marginLeft:"50px"}} onClick={()=>this.showAdd("add")}>添加人员</Button>
                        <Button style={{marginLeft:"50px"}}> 批量管理</Button>
                        <Table columns={this.state.columns} dataSource={this.state.data} />
                    </div>
                </div>
                <Modal
                    title={this.state.titleType}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[<Button key="back" onClick={this.handleCancel}>保存</Button>,
                        <Button key="submit" onClick={this.handleOk}>
                        取消
                        </Button>]}
                >
                    <Form
                        className="ant-advanced-search-form"
                    >
                        <Row gutter={24}>{this.getFields()}</Row>
                    </Form>

                </Modal>
                <Modal
                    title={this.state.peopleAdd}
                    visible={this.state.visibles}
                    onOk={this.handleOks}
                    onCancel={this.handleCancels}
                    width={700}
                    height={650}
                    footer={[<Button key="back" onClick={this.state.sourceType==="edit1"?this.handleSave:this.handleSubmit} style={{opacity:this.state.butVisible?"1":"0"}}>保存</Button>,
                        <Button key="submit" onClick={this.handleOks} >
                            取消
                        </Button>]}
                >
                    <p>基础信息:</p>
                    <Form
                        className="ant-advanced-search-form"
                    >
                        <Row gutter={24}>{this.getFieldsed()}</Row>
                    </Form>


                </Modal>
            </div>
        );
    }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default WrappedAdvancedSearchForm
