import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {is, fromJS} from 'immutable';
import {Form, Input, Select, Row, Col, Card, Button, Modal, Radio,Table} from 'antd';
import Source from"./Home"
import "./style/pending.css"
// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';

class pendingIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            sourceList:[],
            List:false,
            data:[],
            site:"",
            site1:""
        };
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
    Sources=()=>{
        this.setState({
            List:false,
            sourceList:[],
            data:[],
            site:[],
            site1:[]

        })
        this.setState({
            List:true,
            sourceList:Source.ticket,
            data:Source.data,
            site:Source.Company[0],
            site1:Source.data[0]

        })
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
    }
    componentDidMount(){
          this.setState({
              List:false,
          })
        setInterval(
            this.Sources
            ,30000)
    }

    render() {
        const columns = [{
            title: '应拉断路器（开关）、隔离开关（刀闸）',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '目标状态',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '复核',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Button>查看
                </Button>
            ),
        }];
        const {List,sourceList,data,site,site1}=this.state;
        return (
            <div style={{width: "100%", height: "800px", backgroundColor: "#fff", marginTop: "20px"}}>
                <Bcrumb title="待处理工票" icon="users"/>
                <Row style={{padding: 20}}>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                        <Card style={{width: "100%", minHeight: 640, padding: 10}}>
                            <h3 className="char-tiele">待处理工票</h3>
                            <div className="leter-min">
                                {
                                    List?
                                        sourceList.map((item,index)=>{
                                            return (<p key={index} style={{display:"block",height:"25px",lineHeight:"25px",fontSize:"18px",textAlign:"center"}}>
                                                <span style={{width:"50%",textAlign:"left"}}>{item.title}</span><span style={{width:"50%",marginLeft:"30px"}}>{item.time}</span></p>)
                                        })
                                        :
                                        <p style={{textAlign:"center"}}>暂无数据</p>

                                }
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={17} xl={17} style={{marginLeft:"50px"}}>
                        <Card style={{width: "100%", minHeight: 640, padding: 10}}>
                            <div className="test-min">
                                <p style={{width:"100%",display:"block",height:"20px"}}>
                                    <span style={{display:"block",width:"25%",float:"left",fontSize:"18px"}}>主变:{site1.name}</span>
                                    <span style={{display:"block",width:"25%",float:"left",fontSize:"18px"}}> 状态:{site1.age}</span></p>
                                <img src={require("../../public/index.jpg")}
                                     style={{width:"40%", height: 400,marginRight:"20px",float:"left"}}
                                     alt=""/>
                                <div style={{width:"50%",height:400,border:"1px solid #aaa",marginLeft:"80px",overflow:"auto"}}>
                                    <p style={{margin:"0 auto",display:"block",textAlign:"center",fontSize:"20px",height:"50px",lineHeight:"50px",borderBottom:"1px solid #aaa"}}>变电站第一种工作票</p>
                                    <p style={{display:"block",margin:"0 auto",width:"50%",float:"left",fontSize:"15px",textAlign:"center"
                                    }}>单位:{site.class}</p>
                                    <p style={{display:"block",margin:"0 auto",width:"50%",float:"left",fontSize:"15px",textAlign:"center"}}>编号：{site.number}</p>
                                    <Table columns={columns} dataSource={data} />
                                </div>
                            </div>
                            <div className="button-min" style={{marginTop:"80px"}}>
                                <Button
                                    className="fales-button"
                                    onClick={this.showModal}>
                                    异常
                                </Button>
                                <Button style={{backgroundColor: "#fff", color: "#333"}}>通过</Button>
                            </div>
                        </Card>

                    </Col>
                </Row>
                <Modal
                    title="上报"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    okText='上报'
                    cancelText='取消'
                    style={{textAlign:"center"}}

                >
                    1111
                </Modal>
            </div>
        )
    }
}

export default pendingIndex