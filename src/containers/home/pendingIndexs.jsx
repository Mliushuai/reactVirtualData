import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {Link} from 'react-router';
import { numberSource }from '../../redux/action/NumberSource'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, Input, Select, Row, Col, Card, Button, Modal, Radio,Table,Icon,Dropdown,Menu,Pagination} from 'antd';
import './video.css';
import Source from"./Home"
import Source1 from"./Home1"
//公共样式
import '../../component/style/public.less'
import "./style/pending.css"
import "./style/pending.less"
import '../home/style/style.css'
import './rtsp.css'
import Knife  from './image/刀闸.jpg'

// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';

class pendingIndexs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            sourceList:[],
            List:false,
            data:[],
            site:"",
            site1:"",
            sourceDisabled:false,
            showTitle:false
        };
        this.timer=null
    }
    //对模态框的操作

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
    //初始化数据
    Sources=()=>{
        this.setState({
            List:true,
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
    //清除定时器
    TimeInterval=()=>{
        this.setState({
            data:Source1.data,
        })
        clearInterval(this.timer)
    }
    //初始化加载
    componentDidMount(){
        this.timer=setInterval(
            this.TimeInterval
            ,2000)
        this.Sources()

        if(this.props.sourceNumber.sign!==""){
            this.setState({
                List:false,
                sourceDisabled:true,
            })
        }

    }
    //通过  并触发action
    agreement=()=>{
        const {actions} = this.props;
        if(this.props.sourceNumber.sign1===""){
            actions.numberSource(1,"0")
            actions.numberSource(false,"sign")
        }else{
            actions.numberSource(0,"0")
            actions.numberSource(false,"sign")
        }
        actions.numberSource(0,"1")

       this.setState({
           sourceDisabled:true,
           List:false,
       })
    }
    /**
     * 表格显示部分
     * */
    changTextShow=()=>{
       this.setState({
           showTitle:true
       })
    };
    changTextMIn=()=>{
        this.setState({
            showTitle:false
        })
    }
    render() {
        const menu = (
            <Menu >
                <Menu.Item key="1">详情查看</Menu.Item>
                <Menu.Item key="2">本次忽略</Menu.Item>
                <Menu.Item key="3">报告异常</Menu.Item>
            </Menu>
        );

        const {List,sourceList,data,site,site1}=this.state;
        return (
            <div >
                <Row>
                    <Bcrumb title="一键顺控"/>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5} className="LeftFloat">
                        <Card className="contentLeft">
                            <div >
                                <h3 className="Exception">待处理列表</h3>
                            </div>
                            <div>
                                {
                                    List?
                                        sourceList.map((item,index)=>{
                                            return (<div key={index} className="LeftTitle">
                                                <span style={{width: "50%", textAlign: "left", cursor: "pointer",lineHeight:"45px",paddingLeft:"34px"}}>{item.title}</span>
                                                <span style={{width:"50%",float:"right",textAlign:"right",paddingRight:"34px"}}>{item.time}</span>
                                                <Pagination size="small" total={200}  style={{textAlign:"center",marginTop:"600px"}} />
                                                <span style={{display:"block",textAlign:"right",marginRight:"34px"}}>共200条</span>
                                            </div>)
                                        })
                                        :
                                        <Card style={{
                                    width: "100%", minHeight: 875, display: "flex", justifyContent: "center"
                                    , alignItems: "center",
                                }}>
                                    <h1>暂无数据</h1>
                                    </Card>

                                }
                            </div>
                        </Card>
                    </Col>
                    <Col xs={23} sm={23} md={23} lg={18} xl={18} className="RightFloat">
                        <Card  className="contentRight">
                            {
                                this.state.sourceDisabled?
                                    <Card style={{
                                width: "100%", minHeight: 935, display: "flex", justifyContent: "center"
                                , alignItems: "center",
                            }}>
                                <h1>暂无工作票</h1>
                                </Card>
                                    :
                                    <div className="test-min">
                                        <div className="oneKeyTitle">
                                            <p>任务信息</p>
                                            <div className="oneKeyName">
                                                <div style={{width:"50%",height:"40px",float:"left"}}>
                                                <span className="oneKeyNameChange">主变#1号刀闸</span>
                                                </div>
                                                <div style={{width:"50%",height:"40px",float:"left"}}>
                                                    <span className="oneKeyNameChange">当前状态:
                                                        <span style={{color:"#006e6b"}}>&nbsp;&nbsp;&nbsp;&nbsp;闭合</span>
                                                        <span className="oneKeyNameChange" style={{marginLeft:"10%"}}>刀闸复核</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="oneKeyImg">
                                            <div className="Image">
                                                <img src={Knife}/>
                                            </div>
                                            <div className="CameraAction" style={{marginLeft:"8%"}}>
                                                <p><span className="CamTime">编号:</span><span className="CamTimeCent">2018-07-21-001</span></p>
                                                <p><span className="CamTime">单位:</span><span className="CamTimeCent">蠡湖变运检</span></p>
                                                <p><span className="CamTime">地点:</span><span className="CamTimeCent">蠡湖变</span></p>
                                                <p><span className="CamTime">设备:</span><span className="CamTimeCent">#2主变1刀闸</span></p>
                                                <p><span className="CamTime">操作时间:</span><span className="CamTimeCent">2018-7-21</span></p>
                                                <p><span className="CamTime">目标状态:</span><span className="CamTimeCent">闭合</span></p>
                                                <p><span className="CamTime">复核设备:</span><span className="CamTimeCent">摄像机(DACO412)</span></p>
                                                <p><span className="CamTime">复核设备类型:</span><span className="CamTimeCent">枪机(无云台)</span></p>
                                                <p><span className="CamTime">复核时间:</span><span className="CamTimeCent">2018-7-21</span></p>
                                                <p><span className="CamTime">复核结果:</span><span className="CamTimeCent" style={{color:"#006e6b"}}>通过</span></p>
                                                <Dropdown overlay={menu}>
                                                    <Button style={{ marginLeft: 8,
                                                        backgroundColor:"#106664",
                                                        color:"#fff",
                                                        marginTop:"120px"
                                                    }}>
                                                        操作 <Icon type="down" />
                                                    </Button>
                                                </Dropdown>
                                                <Button  style={{backgroundColor: "#fff",
                                                    color: "#106664",
                                                    float:"right",
                                                    width:"100px",
                                                    textAlign:"center",
                                                    marginRight:"34px",
                                                    border:"1px solid #106664",
                                                    marginTop:"120px"
                                                }}
                                                         onClick={this.agreement}>通过</Button>
                                            </div>

                                        </div>

                                        {/*<div style={{width:"50%",height:"728px",float:"left"}}>*/}
                                            {/*<video*/}
                                                {/*// id="my-player"*/}
                                                {/*className="video-js"*/}
                                                {/*controls*/}
                                                {/*preload="auto"*/}
                                                {/*poster="//vjs.zencdn.net/v/oceans.png"*/}
                                                {/*data-setup='{"autoplay":true}'*/}
                                                {/*style={{width:"400px",height:"400px"}}*/}
                                            {/*>*/}
                                                {/*<source src='rtmp://192.168.4.20:1935/hls/livestream' type='rtmp/flv' />*/}
                                            {/*</video>*/}


                                        {/*</div>*/}
                                        {/*<div style={{width:"50%",height:"728px",float:"left",marginTop:"3px"}}>*/}
                                            {/*<div style={{width:"100%",height:"130px",backgroundColor:"#edf0f1"}}>*/}
                                                {/*<p style={{fontSize:"16px",paddingTop:"30px",paddingLeft:"20px"}}>变电站第一工作票</p>*/}
                                                {/*<p style={{display:"block",width:"50%",float:"left",fontSize:"15px",textAlign:"left",paddingLeft:"20px"*/}
                                                {/*}}>单位:{site.class}</p>*/}
                                                {/*<p style={{display:"block",width:"50%",float:"left",fontSize:"15px",textAlign:"left"}}>编号：{site.number}</p>*/}
                                            {/*</div>*/}
                                            {/*<Table columns={columns} dataSource={data} />*/}
                                            {/*<div className="button-min" style={{marginTop:"80px",width:"100%"}}>*/}
                                                {/*<Button*/}
                                                {/*style={{backgroundColor:"#fff",border:"1px solid #eee",color:"#000",float:"left"}}*/}
                                                {/*>*/}
                                                    {/*忽略*/}
                                                {/*</Button>*/}
                                                {/*<Button*/}
                                                    {/*style={{float:"left"}}*/}
                                                    {/*onClick={this.showModal}>*/}
                                                    {/*异常*/}
                                                {/*</Button>*/}

                                            {/*</div>*/}
                                        {/*</div>*/}

                                    </div>
                            }


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
const mapStateToProps = (state, ownProps) => {
    const {sourceNumber} =state
    return {
        sourceNumber:sourceNumber
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({numberSource }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(pendingIndexs);
