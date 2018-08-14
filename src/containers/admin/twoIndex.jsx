import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Modal,Select, Tabs,Radio,message} from 'antd';
import styles  from './style.less'
import { Bcrumb } from '../../component/bcrumb/bcrumb';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
class Just extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[{key:"1",name:"张三"},{key:"2",name:"李四"},{key:"3",name:"王五"},{key:"4",name:"赵六"}],
            numList:"",
            Source:[{key:"22",names:"黎明"},{key:"23",names:"计春华"},{key:"24",names:"杜玉明"}],
            callbackType:"1",
            value:"1"
         }}

    //表单制作
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
                <FormItem label={`角色名称`}
                          {...formItemLayout}
                    style={{marginTop:"35px"}}
                >
                    {getFieldDecorator(`addNum`, {
                        rules: [{
                            required: true,
                            message: '角色名称!',
                        }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={15} key={12} >
                <FormItem label={`角色编码`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`AddName`)(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );

        children.push(
            <Col span={15} key={15} >
                <FormItem label={`所属部门`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`AddJurisdiction`, {
                        rules: [{
                            required: true,
                            message: '选择部门',
                        }],
                    })(
                        <Select  style={{ width: 225 }} onChange={this.handleChange}>
                            <Option value="管理人员">无锡</Option>
                            <Option value="运检人员">运检一部</Option>
                            <Option value="普通用户">普通用户</Option>
                        </Select>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={15} key={16} >
                <FormItem label={`角色说明`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`AddNumber`)(
                        <TextArea rows={4} style={{width:265}}/>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={15} key={17} >
                <FormItem label={`分配人员`}
                          {...formItemLayout}
                >
                    {getFieldDecorator(`AddEmail`)(
                        <Input  />
                    )}
                </FormItem>
            </Col>
        );


        return children;
    }
    callback=(key)=>{
        this.setState({
            callbackType:key,
        })

    }
    ListClick=(num)=>{
       this.setState({
           numList:num,
       })
    }
    //删除数据
    removeSource=()=>{
        if(this.state.callbackType==="1"){
            this.state.dataSource.splice(this.state.numList, 1)
            let source=[]
            this.state.dataSource.map((item,index)=>{
                source.push(item)
            })
            this.setState({
                dataSource:source
            })
        }else{
            this.state.Source.splice(this.state.numList, 1)
            let source=[]
            this.state.Source.map((item,index)=>{
                source.push(item)
            })
            this.setState({
                Source:source
            })
        }


    }
    componentDidMount(){
        if(this.state.value==="1"){
            this.props.form.setFields({
                AddNumber:{
                    value:"这是管理人员描述!",
                }
            })
        }
    }
    //Right点击左侧描述变化
    onChanges = (e) => {
        this.setState({
            value: e.target.value,
        });
        if(e.target.value==="1"){
            this.props.form.setFields({
                AddNumber:{
                    value:"这是管理人员描述!",
                }
            })
        }else if(e.target.value==="2"){
            this.props.form.setFields({
                AddNumber:{
                    value:"这是运检人员描述!",
                }
            })
        }else {
            this.props.form.setFields({
                AddNumber:{
                    value:"这是普通人员描述!",
                }
            })
        }
    }
    sourceSave=()=>{
        message.error("保存失败!")
    }
    render() {
        const {dataSource,Source,value}=this.state
        return (
            <div style={{width:"100%",height:"800px",backgroundColor:"#fff",marginTop:"20px"}}>
                <div style={{width:"65%",height:"700px",margin:"0 auto"}}>
                    <div className="leftContent">
                        <Form
                            className="ant-advanced-search-form"
                        >
                            <Row gutter={24}>{this.getFieldsed()}</Row>
                        </Form>
                        <p>已分配人员:</p>
                        <Tabs
                            defaultActiveKey="1"
                            tabPosition={"left"}
                            style={{ height: 220 }}
                            onChange={this.callback}
                        >
                            <TabPane tab="运检一处" key="1">
                                {
                                    dataSource.map((item,index)=>{
                                   return (<Button onClick={()=>this.ListClick(index)} key={index} style={{width:"400px",margin:"5px"}} >{item.name}</Button>)
                                   })
                                }
                            </TabPane>
                            <TabPane tab="运检二处" key="2">
                                {
                                    Source.map((item,index)=>{
                                        return <Button onClick={()=>this.ListClick(index)} key={index} style={{width:"400px",margin:"5px"}} >{item.names}</Button>
                                    })
                                }
                            </TabPane>
                        </Tabs>
                        <Button type="danger" style={{marginLeft:"350px"}} onClick={this.removeSource}>移除</Button>
                    </div>
                    <div className="rightContent">
                        <RadioGroup onChange={this.onChanges} value={value} style={{fontSize:"20px",marginTop:"50px",marginLeft:"15px"}}>
                            <Radio value={"1"}>管理人员</Radio>
                            <Radio value={"2"}>运检人员</Radio>
                            <Radio value={"3"}>普通用户</Radio>
                        </RadioGroup>
                        <Button style={{marginTop:"550px",marginLeft:"45%"}} onClick={this.sourceSave}>保存</Button><Button style={{marginLeft:"25px"}}>取消</Button>
                    </div>

                </div>
            </div>
        );
    }
}

const Justs = Form.create()(Just);
export default Justs
