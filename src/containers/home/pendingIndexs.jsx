import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {Link} from 'react-router';
import { numberSource }from '../../redux/action/NumberSource'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, Input, Select, Row, Col, Card, Button, Modal, Radio,Table,Icon} from 'antd';
// import { Player } from 'video-react';
// import "./video-react.css";
import { DefaultPlayer as Video } from 'react-html5video';
import './video.css';
import Source from"./Home"
import Source1 from"./Home1"
import "./style/pending.css"
import '../home/style/style.css'
import Backgrounds from '../image/img2.jpg';
import BackgroundImage from '../image/img3.jpg';
const sectionStyles = {
    width: "100%",
    height: "60px",
    backgroundImage: `url(${BackgroundImage})`,

};
const sectionStyle = {
    width: "100%",
    height: "80px",
    backgroundImage: `url(${Backgrounds})`,
    backgroundSize:"100% 100%",
    borderBottom:"2px solid #eee"
};
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
            title: "",
            filterMultiple:false,
            width: '20%',
            key: 'action',
            filterDropdown: <span></span>,
            filterIcon:
                <div>
                        {this.state.showTitle?
                            <div onClick={this.changTextMIn} style={{display:"flex",justifyContent:"center",alignItems:"center",width:50}}><Icon type="appstore"></Icon>操作</div>
                            :
                            <div onClick={this.changTextShow} style={{display:"flex",justifyContent:"center",alignItems:"center",width:50}}><Icon type="appstore"></Icon>操作</div>
                           }
                </div> ,
            filterDropdownVisible: true,
            render: (text, record) => (
                <Button style={{display:this.state.showTitle?"block":"none"}}>查看</Button>
            ),
        }];
        const {List,sourceList,data,site,site1}=this.state;
        return (
            <div style={{width: "100%", height: "800px", backgroundColor: "#fff"}}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card style={{width: "100%", minHeight: 810,padding:"0"}}>
                            {/*<h3 className="char-tiele">待处理工票</h3>*/}
                            <div style={sectionStyles} >
                                <h3 className="char-tieles">待处理工票</h3>
                            </div>
                            <div>
                                {
                                    List?
                                        sourceList.map((item,index)=>{
                                            return (<div key={index} style={{display:"block",height:"50px",lineHeight:"50px",fontSize:"18px",paddingLeft:"20px"}}>
                                                <span style={{width:"50%",textAlign:"left",float:"left"}}>{item.title}</span><span style={{width:"50%",float:"right",textAlign:"right",paddingRight:"20px"}}>{item.time}</span></div>)
                                        })
                                        :
                                        <p style={{textAlign:"center"}}>暂无数据</p>

                                }
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                        <Card style={{width: "100%", minHeight: 810,padding:"0"}}>
                            {
                                this.state.sourceDisabled?
                                    <p style={{fontSize:"20px",textAlign:"center"}}>暂无工作票</p>
                                    :
                                    <div className="test-min">
                                        <div style={sectionStyle} >
                                            <span  className="oneKeyChange">主变:{site1.name}<span  style={{display:"block",float:"right",paddingRight:"20px"}}> 状态:{site1.age}</span></span>

                                        </div>
                                        <div style={{width:"50%",height:"728px",float:"left"}}>
                                            <div style={{width:"500px",height:"500px",margin:"0 auto",marginTop:"50px"}}>
                                            <Video autoPlay loop muted
                                            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                            poster=""
                                            onCanPlayThrough={() => {
                                            // Do stuff
                                            }}>
                                            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"  />
                                            {/*<track label="English" kind="subtitles" srcLang="en" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" default />*/}
                                            </Video>
                                                </div>
                                        </div>
                                        <div style={{width:"50%",height:"728px",float:"left",marginTop:"3px"}}>
                                            <div style={{width:"100%",height:"130px",backgroundColor:"#edf0f1"}}>
                                                <p style={{fontSize:"16px",paddingTop:"30px",paddingLeft:"20px"}}>变电站第一工作票</p>
                                                <p style={{display:"block",width:"50%",float:"left",fontSize:"15px",textAlign:"left",paddingLeft:"20px"
                                                }}>单位:{site.class}</p>
                                                <p style={{display:"block",width:"50%",float:"left",fontSize:"15px",textAlign:"left"}}>编号：{site.number}</p>
                                            </div>
                                            <Table columns={columns} dataSource={data} />
                                            <div className="button-min" style={{marginTop:"80px",width:"100%"}}>
                                                <Button
                                                style={{backgroundColor:"#fff",border:"1px solid #eee",color:"#000",float:"left"}}
                                                >
                                                    忽略
                                                </Button>
                                                <Button
                                                    style={{float:"left"}}
                                                    onClick={this.showModal}>
                                                    异常
                                                </Button>
                                                <Button  style={{backgroundColor: "#fff", color: "#333",float:"right"}} onClick={this.agreement}>通过</Button>
                                            </div>
                                        </div>

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
