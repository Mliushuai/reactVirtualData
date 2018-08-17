import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {
    Form,
    Icon,
    Row,
    Col,
    Card,
    Modal,
    Steps,
    Button,
    message,
    Table,
    Tree,
    Input,
    Spin,
    Pagination,
    Dropdown, Menu
} from 'antd';
import RirhtTitleNav from '../../publicModule/RirhtTitleNav'
// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';
/**
 * css样式
 */
import "../../public/css/publicStyle.css"
import '../../component/style/public.less'
import '../../style/left.less';
import '../home/style/style.css'
import '../home/style/homeIndex.css'
import './../image/public.css'

//放大
import enlarge from '../../containers/charts/image/放大.png'
import enlarge1 from '../../containers/charts/image/放大2.png'
//缩小
import narrow from '../../containers/charts/image/缩小.png'
import narrow1 from '../../containers/charts/image/缩小2.png'
//拉近焦距
import zoom from '../../containers/charts/image/拉近焦距.png'
import zoom1 from '../../containers/charts/image/拉近焦距2.png'
//后退焦距
import Backs from '../../containers/charts/image/后退焦距.png'
import Backs1 from '../../containers/charts/image/后退焦距2.png'
//左旋转
import handed from '../../containers/charts/image/左旋.png'
import handed1 from '../../containers/charts/image/左旋2.png'
//右旋转
import rotation from '../../containers/charts/image/右旋.png'
import rotation1 from '../../containers/charts/image/右旋2.png'
//光圈放大
import amplification from '../../containers/charts/image/光圈放大.png'
import amplification1 from '../../containers/charts/image/光圈放大2.png'
//光圈缩小
import reduction from '../../containers/charts/image/光圈缩小.png'
import reduction1 from '../../containers/charts/image/光圈缩小2.png'
import {bindActionCreators} from "redux";
import {numberSource} from "../../redux/action/NumberSource";
import {connect} from "react-redux";
import level from "../../public/onePag.jpg";
import LineCharts from "../charts/LineCharts";
import {Link} from "react-router";
/* 以类的方式创建一个组件 */
const columns = [{
    key: "1",
    code: '2018-05-24-001',
    meaterType: "油位警报",
    time: "2018-5-24 12:00",
    levelType: "一般",
    location: "1电站东南",
    explain: "警报——复核——声音驱逐——人员查看"
}
];



/* 以类的方式创建一个组件 */
class contentDetail extends Component {
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
                    name: "油位异常"
                }
            ],
            upperLeft:"",
            upper:"",
            upperRight:"",
            Left:"",
            Right:"",
            DownLeft:"",
            Down:"",
            DownRight:"",
            ZeroCame:"",
            enlarge:false,
            handed:false,
            zoom:false,
            amplification:false,
            narrow:false,
            rotation:false,
            Backs:false,
            reduction:false,
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
        if(this.props.sourceNumber.sign1!==""){
            this.setState({
                showMin: false
            })
        }
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
        const {actions} = this.props;
        if(this.props.sourceNumber.sign===""){
            actions.numberSource(1,"0")
            actions.numberSource(false,"sign1")
        }else{
            actions.numberSource(0,"0")
            actions.numberSource(false,"sign1")
        }
        actions.numberSource(0,"3")
        this.setState({
            nowData: nowdata,
            showMin: false
        })


    }
    // showTotal=(total)=> {
    //     return `共${total}条`;
    // }

    onMouseDowns=(type)=>{
        if(type==="upper"){
            this.refs.upper.style.backgroundColor="#106664"
            this.refs.upper.style.border="1px solid #106664"
            this.setState({
                upper:"#fff"
            })
        }else if(type==="upperLeft"){
            this.refs.upperLeft.style.backgroundColor="#106664"
            this.refs.upperLeft.style.border="1px solid #106664"
            this.setState({
                upperLeft:"#fff"
            })
        }else if(type==="upperRight"){
            this.refs.upperRight.style.backgroundColor="#106664"
            this.refs.upperRight.style.border="1px solid #106664"
            this.setState({
                upperRight:"#fff"
            })
        }else if(type==="Left"){
            this.refs.Left.style.backgroundColor="#106664"
            this.refs.Left.style.border="1px solid #106664"
            this.setState({
                Left:"#fff"
            })
        }else if(type==="Right"){
            this.refs.Right.style.backgroundColor="#106664"
            this.refs.Right.style.border="1px solid #106664"
            this.setState({
                Right:"#fff"
            })
        }else if(type==="DownLeft"){
            this.refs.DownLeft.style.backgroundColor="#106664"
            this.refs.DownLeft.style.border="1px solid #106664"
            this.setState({
                DownLeft:"#fff"
            })
        }else if(type==="Down"){
            this.refs.Down.style.backgroundColor="#106664"
            this.refs.Down.style.border="1px solid #106664"
            this.setState({
                Down:"#fff"
            })
        }else if(type==="DownRight"){
            this.refs.DownRight.style.backgroundColor="#106664"
            this.refs.DownRight.style.border="1px solid #106664"
            this.setState({
                DownRight:"#fff"
            })
        }else if(type==="enlarge"){
            this.refs.enlarge.style.backgroundColor="#106664"
            this.setState({
                enlarge:true,
            })
        }else if(type==="handed"){
            this.refs.handed.style.backgroundColor="#106664"
            this.setState({
                handed:true,
            })
        }else if(type==="zoom"){
            this.refs.zoom.style.backgroundColor="#106664"
            this.setState({
                zoom:true,
            })
        }else if(type==="amplification"){
            this.refs.amplification.style.backgroundColor="#106664"
            this.setState({
                amplification:true,
            })
        }else if(type==="narrow"){
            this.refs.narrow.style.backgroundColor="#106664"
            this.setState({
                narrow:true,
            })
        }else if(type==="rotation"){
            this.refs.rotation.style.backgroundColor="#106664"
            this.setState({
                rotation:true,
            })
        }else if(type==="Backs"){
            this.refs.Backs.style.backgroundColor="#106664"
            this.setState({
                Backs:true,
            })
        }else if(type==="reduction"){
            this.refs.reduction.style.backgroundColor="#106664"
            this.setState({
                reduction:true,
            })
        }else if(type==="ZeroCame"){
            this.refs.ZeroCame.style.backgroundColor="#106664"
            this.setState({
                ZeroCame:"#fff"
            })
        }

    }
    onMouseUps=(type)=>{
        if(type==="upper"){
            this.refs.upper.style.backgroundColor=""
            this.refs.upper.style.border=""
            this.setState({
                upper:""
            })
        }else if(type==="upperLeft"){
            this.refs.upperLeft.style.backgroundColor=""
            this.refs.upperLeft.style.border=""
            this.setState({
                upperLeft:""
            })
        }else if(type==="upperRight"){
            this.refs.upperRight.style.backgroundColor=""
            this.refs.upperRight.style.border=""
            this.setState({
                upperRight:""
            })
        }else if(type==="Left"){
            this.refs.Left.style.backgroundColor=""
            this.refs.Left.style.border=""
            this.setState({
                Left:""
            })
        }else if(type==="Right"){
            this.refs.Right.style.backgroundColor=""
            this.refs.Right.style.border=""
            this.setState({
                Right:""
            })
        }else if(type==="DownLeft"){
            this.refs.DownLeft.style.backgroundColor=""
            this.refs.DownLeft.style.border=""
            this.setState({
                DownLeft:""
            })
        }else if(type==="Down"){
            this.refs.Down.style.backgroundColor=""
            this.refs.Down.style.border=""
            this.setState({
                Down:""
            })
        }else if(type==="DownRight"){
            this.refs.DownRight.style.backgroundColor=""
            this.refs.DownRight.style.border=""
            this.setState({
                DownRight:""
            })
        }else if(type==="enlarge"){
            this.refs.enlarge.style.backgroundColor=""
            this.setState({
                enlarge:false,
            })
        }else if(type==="handed"){
            this.refs.handed.style.backgroundColor=""
            this.setState({
                handed:false,
            })
        }else if(type==="zoom"){
            this.refs.zoom.style.backgroundColor=""
            this.setState({
                zoom:false,
            })
        }else if(type==="amplification"){
            this.refs.amplification.style.backgroundColor=""
            this.setState({
                amplification:false,
            })
        }else if(type==="narrow"){
            this.refs.narrow.style.backgroundColor=""
            this.setState({
                narrow:false,
            })
        }else if(type==="rotation"){
            this.refs.rotation.style.backgroundColor=""
            this.setState({
                rotation:false,
            })
        }else if(type==="Backs"){
            this.refs.Backs.style.backgroundColor=""
            this.setState({
                Backs:false,
            })
        }else if(type==="reduction"){
            this.refs.reduction.style.backgroundColor=""
            this.setState({
                reduction:false,
            })
        }else if(type==="ZeroCame"){
            this.refs.ZeroCame.style.backgroundColor=""
            this.setState({
                ZeroCame:""
            })
        }

    }
    GoAction=(changeData)=>{
        console.log(changeData)
        const {actions} = this.props;
        actions.changekeyData(changeData,"")
    };
    render() {
        const {dataSource, code, time, meaterType, levelType, location, explain, key,
            upperLeft,upper,upperRight,Left,Right,DownLeft,Down,DownRight,ZeroCame
        } = this.state;
        const menu = (
            <Menu >
                <Menu.Item key="1">详情查看</Menu.Item>
                <Menu.Item key="2">本次忽略</Menu.Item>
                <Menu.Item key="3">报告异常</Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Row>
                    <div className="bread-crumb ant-breadcrumb">
                        <Link to="/home"><span  style={{fontWeight:"bold",color:"#0d1026"}}>主页&nbsp;/&nbsp;</span></Link>
                        <Link to="/AIinspect"><span  style={{fontWeight:"bold",color:"#0d1026"}}>智能巡检&nbsp;/&nbsp;</span></Link>
                        <span>点位详情</span>
                    </div>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5} className="LeftFloat">
                        <Card className="contentLeft" style={{padding:0}}>
                            <RirhtTitleNav
                                title={"点位列表"}
                            />
                            <div className="pagin-bottom">
                                <Pagination size="small" total={200} style={{textAlign: "center"}}/>
                            </div>
                        </Card>

                    </Col>
                    <Col xs={23} sm={23} md={23} lg={18} xl={18} className="RightFloat">
                        <div style={{display: this.state.showMin === true ? "block" : "none"}}>
                            <Card  className="contentRight">
                                <span className="Tunnel">220KV青海变隧道</span>
                                <div className="Camera">
                                    <img src={level} className="CameraLevel"/>
                                    <div className="CameraCtrl">
                                        <span style={{display:"block",width:"100%",height:"25px"}}></span>
                                        <div className="ActionImg">
                                            <span
                                                ref="upperLeft"
                                                onMouseDown={()=>this.onMouseDowns("upperLeft")}
                                                onMouseUp={()=>this.onMouseUps("upperLeft")}
                                            ><Icon type="caret-up"  className="IconSize" style={{transform:"rotate(-45deg)",color:upperLeft}}/></span>
                                            <span
                                                ref="upper"
                                                onMouseDown={()=>this.onMouseDowns("upper")}
                                                onMouseUp={()=>this.onMouseUps("upper")}
                                            ><Icon type="caret-up" className="IconSize" style={{color:upper}}/></span>
                                            <span
                                                ref="upperRight"
                                                onMouseDown={()=>this.onMouseDowns("upperRight")}
                                                onMouseUp={()=>this.onMouseUps("upperRight")}
                                            ><Icon type="caret-up" style={{transform:"rotate(45deg)",color:upperRight}} className="IconSize"/></span>
                                            <span
                                                ref="Left"
                                                onMouseDown={()=>this.onMouseDowns("Left")}
                                                onMouseUp={()=>this.onMouseUps("Left")}
                                            ><Icon type="caret-left" className="IconSize" style={{color:Left}}/></span>
                                            <span
                                                ref="ZeroCame"
                                                onMouseDown={()=>this.onMouseDowns("ZeroCame")}
                                                onMouseUp={()=>this.onMouseUps("ZeroCame")}
                                            ><p className="ZeroCame"
                                                style={{backgroundColor:ZeroCame}}
                                            ></p></span>
                                            <span
                                                ref="Right"
                                                onMouseDown={()=>this.onMouseDowns("Right")}
                                                onMouseUp={()=>this.onMouseUps("Right")}
                                            ><Icon  type="caret-right" className="IconSize"style={{color:Right}} /></span>
                                            <span
                                                ref="DownLeft"
                                                onMouseDown={()=>this.onMouseDowns("DownLeft")}
                                                onMouseUp={()=>this.onMouseUps("DownLeft")}
                                            ><Icon type="caret-down"  className="IconSize"  style={{transform:"rotate(45deg)",color:DownLeft}}/></span>
                                            <span
                                                ref="Down"
                                                onMouseDown={()=>this.onMouseDowns("Down")}
                                                onMouseUp={()=>this.onMouseUps("Down")}
                                            ><Icon type="caret-down"  className="IconSize" style={{color:Down}}/></span>
                                            <span
                                                ref="DownRight"
                                                onMouseDown={()=>this.onMouseDowns("DownRight")}
                                                onMouseUp={()=>this.onMouseUps("DownRight")}
                                            ><Icon type="caret-down"  className="IconSize"  style={{transform:"rotate(-45deg)",color:DownRight}}/></span>
                                        </div>
                                        <div className="GeneralImage">
                                            <span
                                                ref="enlarge"
                                                onMouseDown={()=>this.onMouseDowns("enlarge")}
                                                onMouseUp={()=>this.onMouseUps("enlarge")}
                                            > <img src={enlarge} style={{display:this.state.enlarge?"none":"block"}} className="enlarge"/>
                                              <img src={enlarge1} style={{display:this.state.enlarge?"block":"none"}} className="enlarge"/>
                                            </span>
                                            <span
                                                ref="handed"
                                                onMouseDown={()=>this.onMouseDowns("handed")}
                                                onMouseUp={()=>this.onMouseUps("handed")}
                                            ><img src={handed} style={{display:this.state.handed?"none":"block"}} className="enlarge"/>
                                             <img src={handed1} style={{display:this.state.handed?"block":"none"}} className="enlarge"/>
                                            </span>
                                            <span
                                                ref="zoom"
                                                onMouseDown={()=>this.onMouseDowns("zoom")}
                                                onMouseUp={()=>this.onMouseUps("zoom")}
                                            ><img src={zoom} style={{display:this.state.zoom?"none":"block"}} className="enlarge"/>
                                            <img src={zoom1} style={{height:"48px",display:this.state.zoom?"block":"none"}} className="enlarge"/>
                                            </span>
                                            <span
                                                ref="amplification"
                                                onMouseDown={()=>this.onMouseDowns("amplification")}
                                                onMouseUp={()=>this.onMouseUps("amplification")}
                                            ><img src={amplification} style={{display:this.state.amplification?"none":"block"}} className="enlarge"/>
                                            <img src={amplification1} style={{display:this.state.amplification?"block":"none"}} className="enlarge"/>
                                            </span>
                                            <span className="FontImage">放大</span>
                                            <span className="FontImage">左旋转</span>
                                            <span className="FontImage">拉近</span>
                                            <span className="FontImage">光圈</span>
                                            <span
                                                ref="narrow"
                                                onMouseDown={()=>this.onMouseDowns("narrow")}
                                                onMouseUp={()=>this.onMouseUps("narrow")}
                                            > <img src={narrow} style={{display:this.state.narrow?"none":"block"}} className="enlarge"/>
                                            <img src={narrow1} style={{display:this.state.narrow?"block":"none"}} className="enlarge"/>
                                            </span>
                                            <span
                                                ref="rotation"
                                                onMouseDown={()=>this.onMouseDowns("rotation")}
                                                onMouseUp={()=>this.onMouseUps("rotation")}
                                            ><img src={rotation} style={{display:this.state.rotation?"none":"block"}} className="enlarge"/>
                                            <img src={rotation1} style={{display:this.state.rotation?"block":"none"}} className="enlarge"/>
                                            </span>
                                            <span
                                                ref="Backs"
                                                onMouseDown={()=>this.onMouseDowns("Backs")}
                                                onMouseUp={()=>this.onMouseUps("Backs")}
                                            ><img src={Backs} style={{display:this.state.Backs?"none":"block"}} className="enlarge"/>
                                            <img src={Backs1} style={{display:this.state.Backs?"block":"none"}} className="enlarge"/>
                                            </span>
                                            <span
                                                ref="reduction"
                                                onMouseDown={()=>this.onMouseDowns("reduction")}
                                                onMouseUp={()=>this.onMouseUps("reduction")}
                                            ><img src={reduction} style={{display:this.state.reduction?"none":"block"}} className="enlarge"/>
                                            <img src={reduction1} style={{display:this.state.reduction?"block":"none"}} className="enlarge"/>
                                            </span>
                                            <span className="FontImage">缩小</span>
                                            <span className="FontImage">右旋转</span>
                                            <span className="FontImage">后退</span>
                                            <span className="FontImage">光圈</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="CameraAction">
                                    <p><span className="CamTime">事件编号:</span><span className="CamTimeCent">2018-05-21-001</span></p>
                                    <p><span className="CamTime">事件类型:</span><span className="CamTimeCent">油位超低</span></p>
                                    <p><span className="CamTime">报警时间:</span><span className="CamTimeCent">{time}</span></p>
                                    <p><span className="CamTime">巡检编号:</span><span className="CamTimeCent">LHB012</span></p>
                                    <p><span className="CamTime">位置:</span><span className="CamTimeCent">{location}</span></p>
                                    <p><span className="CamTime">设备:</span><span className="CamTimeCent">青海变#2油位表</span></p>
                                    <p><span className="CamTime">图像设备:</span><span className="CamTimeCent">ZAC120514</span></p>
                                    <p><span className="CamTime">当前数值:</span><span className="CamTimeCent">60</span></p>
                                    <p><span className="CamTime">时间说明:</span><span className="CamTimeCent">油位值小于60发出警报</span></p>
                                    <p><span className="CamTime">时间流程:</span></p>
                                    <p style={{color:"#0d1a26"}}>{explain}</p>
                                    <Dropdown overlay={menu}>
                                        <Button style={{ marginLeft: 8,
                                            backgroundColor:"#106664",
                                            color:"#fff",
                                            marginTop:210,
                                            width: 120,
                                            height: 40,
                                        }}>
                                            操作 <Icon type="up" />
                                        </Button>
                                    </Dropdown>
                                    <Button
                                        style={{float: "right", marginTop: 210, marginRight: "34px",backgroundColor:"#fff",border:"1px solid #106664",color:"#106664",width: 120, height: 40,}}
                                        onClick={this.deletData.bind(this, key)}
                                        type="primary"
                                    >异常解除</Button>
                                </div>
                                {/*<div style={{width:"65%",height:"728px",float:"left",borderRight:"2px solid #eee"}}>*/}
                                {/*<img src={require("../../public/onePag.jpg")}*/}
                                {/*style={{width: "70%", height: "auto",display:"block",marginLeft:"15%",marginTop:"100px"}}*/}
                                {/*alt=""/>*/}
                                {/*<div style={{width: "100%", height: "200px", clear: "both",}}>*/}

                                {/*style={{float: "left", marginTop: "130px", marginLeft: "15%",backgroundColor:"#fff",color:"#000",border:"1px solid #aaa"}}*/}
                                {/*onClick={this.showModal}*/}
                                {/*type="primary"*/}
                                {/*>历史</Button>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div style={{width:"33%",height:"728px",float:"left"}}>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "50px",paddingLeft:"100px"}}>事件编号:</p>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "20px",paddingLeft:"100px"}}>2018-08-01-001</p>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "30px",paddingLeft:"100px"}}>事件类型:</p>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "20px",paddingLeft:"100px"}}>{meaterType}</p>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "30px",paddingLeft:"100px"}}>报警时间:</p>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "20px",paddingLeft:"100px"}}>{time}</p>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "30px",paddingLeft:"100px"}}>紧急程度:</p>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "20px",paddingLeft:"100px"}}>{levelType}</p>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "30px",paddingLeft:"100px"}}>位置:</p>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "20px",paddingLeft:"100px"}}>{location}</p>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "30px",paddingLeft:"100px"}}>事件流程:</p>*/}
                                {/*<p style={{fontSize: "16px", marginTop: "20px",paddingLeft:"100px"}}>{explain}</p>*/}
                                {/*</div>*/}

                            </Card>
                        </div>
                        <div style={{display: this.state.showMin === true ? "none" : "block",}}>
                            <Card style={{
                                width: "100%", minHeight: 875, display: "flex", justifyContent: "center"
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

export default connect(mapStateToProps, mapDispatchToProps)(contentDetail);
// const contentDetail = Form.create()(contentDetails);

// export default contentDetail;

