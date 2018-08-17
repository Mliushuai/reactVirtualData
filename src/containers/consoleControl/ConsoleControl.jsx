import level from "../../public/onePag.jpg";
import {Button, Card, Col, Dropdown, Icon, Menu, Modal, Pagination, Row} from "antd";
import "../../public/css/publicStyle.css"
import '../../component/style/public.less'
import '../../style/left.less';
import '../home/style/style.css'
import '../home/style/homeIndex.css'
import './../image/public.css'
import enlarge from "../charts/image/放大.png";
import enlarge1 from "../charts/image/放大2.png";
import handed from "../charts/image/左旋.png";
import handed1 from "../charts/image/左旋2.png";
import zoom from "../charts/image/拉近焦距.png";
import zoom1 from "../charts/image/拉近焦距2.png";
import amplification from "../charts/image/光圈放大.png";
import amplification1 from "../charts/image/光圈放大2.png";
import narrow from "../charts/image/缩小.png";
import narrow1 from "../charts/image/缩小2.png";
import rotation from "../charts/image/右旋.png";
import rotation1 from "../charts/image/右旋2.png";
import Backs from "../charts/image/后退焦距.png";
import Backs1 from "../charts/image/后退焦距2.png";
import reduction from "../charts/image/光圈缩小.png";
import reduction1 from "../charts/image/光圈缩小2.png";
import React, {Component} from "react";
import {Link} from "react-router";
import RirhtTitleNav from "../../publicModule/RirhtTitleNav";
import LineCharts from "../charts/LineCharts";
import {bindActionCreators} from "redux";
import {numberSource} from "../../redux/action/NumberSource";
import {connect} from "react-redux";

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
class ConsoleControl extends Component {
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
            upperLeft: "",
            upper: "",
            upperRight: "",
            Left: "",
            Right: "",
            DownLeft: "",
            Down: "",
            DownRight: "",
            ZeroCame: "",
            enlarge: false,
            handed: false,
            zoom: false,
            amplification: false,
            narrow: false,
            rotation: false,
            Backs: false,
            reduction: false,
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
        if (this.props.sourceNumber.sign1 !== "") {
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
        if (this.props.sourceNumber.sign === "") {
            actions.numberSource(1, "0")
            actions.numberSource(false, "sign1")
        } else {
            actions.numberSource(0, "0")
            actions.numberSource(false, "sign1")
        }
        actions.numberSource(0, "3")
        this.setState({
            nowData: nowdata,
            showMin: false
        })


    }
    // showTotal=(total)=> {
    //     return `共${total}条`;
    // }

    onMouseDowns = (type) => {
        if (type === "upper") {
            this.refs.upper.style.backgroundColor = "#106664"
            this.refs.upper.style.border = "1px solid #106664"
            this.setState({
                upper: "#fff"
            })
        } else if (type === "upperLeft") {
            this.refs.upperLeft.style.backgroundColor = "#106664"
            this.refs.upperLeft.style.border = "1px solid #106664"
            this.setState({
                upperLeft: "#fff"
            })
        } else if (type === "upperRight") {
            this.refs.upperRight.style.backgroundColor = "#106664"
            this.refs.upperRight.style.border = "1px solid #106664"
            this.setState({
                upperRight: "#fff"
            })
        } else if (type === "Left") {
            this.refs.Left.style.backgroundColor = "#106664"
            this.refs.Left.style.border = "1px solid #106664"
            this.setState({
                Left: "#fff"
            })
        } else if (type === "Right") {
            this.refs.Right.style.backgroundColor = "#106664"
            this.refs.Right.style.border = "1px solid #106664"
            this.setState({
                Right: "#fff"
            })
        } else if (type === "DownLeft") {
            this.refs.DownLeft.style.backgroundColor = "#106664"
            this.refs.DownLeft.style.border = "1px solid #106664"
            this.setState({
                DownLeft: "#fff"
            })
        } else if (type === "Down") {
            this.refs.Down.style.backgroundColor = "#106664"
            this.refs.Down.style.border = "1px solid #106664"
            this.setState({
                Down: "#fff"
            })
        } else if (type === "DownRight") {
            this.refs.DownRight.style.backgroundColor = "#106664"
            this.refs.DownRight.style.border = "1px solid #106664"
            this.setState({
                DownRight: "#fff"
            })
        } else if (type === "enlarge") {
            this.refs.enlarge.style.backgroundColor = "#106664"
            this.setState({
                enlarge: true,
            })
        } else if (type === "handed") {
            this.refs.handed.style.backgroundColor = "#106664"
            this.setState({
                handed: true,
            })
        } else if (type === "zoom") {
            this.refs.zoom.style.backgroundColor = "#106664"
            this.setState({
                zoom: true,
            })
        } else if (type === "amplification") {
            this.refs.amplification.style.backgroundColor = "#106664"
            this.setState({
                amplification: true,
            })
        } else if (type === "narrow") {
            this.refs.narrow.style.backgroundColor = "#106664"
            this.setState({
                narrow: true,
            })
        } else if (type === "rotation") {
            this.refs.rotation.style.backgroundColor = "#106664"
            this.setState({
                rotation: true,
            })
        } else if (type === "Backs") {
            this.refs.Backs.style.backgroundColor = "#106664"
            this.setState({
                Backs: true,
            })
        } else if (type === "reduction") {
            this.refs.reduction.style.backgroundColor = "#106664"
            this.setState({
                reduction: true,
            })
        } else if (type === "ZeroCame") {
            this.refs.ZeroCame.style.backgroundColor = "#106664"
            this.setState({
                ZeroCame: "#fff"
            })
        }

    }
    onMouseUps = (type) => {
        if (type === "upper") {
            this.refs.upper.style.backgroundColor = ""
            this.refs.upper.style.border = ""
            this.setState({
                upper: ""
            })
        } else if (type === "upperLeft") {
            this.refs.upperLeft.style.backgroundColor = ""
            this.refs.upperLeft.style.border = ""
            this.setState({
                upperLeft: ""
            })
        } else if (type === "upperRight") {
            this.refs.upperRight.style.backgroundColor = ""
            this.refs.upperRight.style.border = ""
            this.setState({
                upperRight: ""
            })
        } else if (type === "Left") {
            this.refs.Left.style.backgroundColor = ""
            this.refs.Left.style.border = ""
            this.setState({
                Left: ""
            })
        } else if (type === "Right") {
            this.refs.Right.style.backgroundColor = ""
            this.refs.Right.style.border = ""
            this.setState({
                Right: ""
            })
        } else if (type === "DownLeft") {
            this.refs.DownLeft.style.backgroundColor = ""
            this.refs.DownLeft.style.border = ""
            this.setState({
                DownLeft: ""
            })
        } else if (type === "Down") {
            this.refs.Down.style.backgroundColor = ""
            this.refs.Down.style.border = ""
            this.setState({
                Down: ""
            })
        } else if (type === "DownRight") {
            this.refs.DownRight.style.backgroundColor = ""
            this.refs.DownRight.style.border = ""
            this.setState({
                DownRight: ""
            })
        } else if (type === "enlarge") {
            this.refs.enlarge.style.backgroundColor = ""
            this.setState({
                enlarge: false,
            })
        } else if (type === "handed") {
            this.refs.handed.style.backgroundColor = ""
            this.setState({
                handed: false,
            })
        } else if (type === "zoom") {
            this.refs.zoom.style.backgroundColor = ""
            this.setState({
                zoom: false,
            })
        } else if (type === "amplification") {
            this.refs.amplification.style.backgroundColor = ""
            this.setState({
                amplification: false,
            })
        } else if (type === "narrow") {
            this.refs.narrow.style.backgroundColor = ""
            this.setState({
                narrow: false,
            })
        } else if (type === "rotation") {
            this.refs.rotation.style.backgroundColor = ""
            this.setState({
                rotation: false,
            })
        } else if (type === "Backs") {
            this.refs.Backs.style.backgroundColor = ""
            this.setState({
                Backs: false,
            })
        } else if (type === "reduction") {
            this.refs.reduction.style.backgroundColor = ""
            this.setState({
                reduction: false,
            })
        } else if (type === "ZeroCame") {
            this.refs.ZeroCame.style.backgroundColor = ""
            this.setState({
                ZeroCame: ""
            })
        }

    }
    GoAction = (changeData) => {
        console.log(changeData)
        const {actions} = this.props;
        actions.changekeyData(changeData, "")
    };

    render() {
        const {
            dataSource, code, time, meaterType, levelType, location, explain, key,
            upperLeft, upper, upperRight, Left, Right, DownLeft, Down, DownRight, ZeroCame
        } = this.state;
        const menu = (
            <Menu>
                <Menu.Item key="1">详情查看</Menu.Item>
                <Menu.Item key="2">本次忽略</Menu.Item>
                <Menu.Item key="3">报告异常</Menu.Item>
            </Menu>
        );
        return (
            <div className="Camera" style={{width:'50%',height:200}}>
                <div className="CameraCtrl">
                    <div className="ActionImg">
                        <span
                            ref="upperLeft"
                            onMouseDown={() => this.onMouseDowns("upperLeft")}
                            onMouseUp={() => this.onMouseUps("upperLeft")}
                        ><Icon type="caret-up" className="IconSize"
                               style={{transform: "rotate(-45deg)", color: upperLeft}}/></span>
                        <span
                            ref="upper"
                            onMouseDown={() => this.onMouseDowns("upper")}
                            onMouseUp={() => this.onMouseUps("upper")}
                        ><Icon type="caret-up" className="IconSize" style={{color: upper}}/></span>
                        <span
                            ref="upperRight"
                            onMouseDown={() => this.onMouseDowns("upperRight")}
                            onMouseUp={() => this.onMouseUps("upperRight")}
                        ><Icon type="caret-up" style={{transform: "rotate(45deg)", color: upperRight}}
                               className="IconSize"/></span>
                        <span
                            ref="Left"
                            onMouseDown={() => this.onMouseDowns("Left")}
                            onMouseUp={() => this.onMouseUps("Left")}
                        ><Icon type="caret-left" className="IconSize" style={{color: Left}}/></span>
                        <span
                            ref="ZeroCame"
                            onMouseDown={() => this.onMouseDowns("ZeroCame")}
                            onMouseUp={() => this.onMouseUps("ZeroCame")}
                        ><p className="ZeroCame"
                            style={{backgroundColor: ZeroCame}}
                        ></p></span>
                        <span
                            ref="Right"
                            onMouseDown={() => this.onMouseDowns("Right")}
                            onMouseUp={() => this.onMouseUps("Right")}
                        ><Icon type="caret-right" className="IconSize" style={{color: Right}}/></span>
                        <span
                            ref="DownLeft"
                            onMouseDown={() => this.onMouseDowns("DownLeft")}
                            onMouseUp={() => this.onMouseUps("DownLeft")}
                        ><Icon type="caret-down" className="IconSize"
                               style={{transform: "rotate(45deg)", color: DownLeft}}/></span>
                        <span
                            ref="Down"
                            onMouseDown={() => this.onMouseDowns("Down")}
                            onMouseUp={() => this.onMouseUps("Down")}
                        ><Icon type="caret-down" className="IconSize" style={{color: Down}}/></span>
                        <span
                            ref="DownRight"
                            onMouseDown={() => this.onMouseDowns("DownRight")}
                            onMouseUp={() => this.onMouseUps("DownRight")}
                        ><Icon type="caret-down" className="IconSize"
                               style={{transform: "rotate(-45deg)", color: DownRight}}/></span>
                    </div>
                    <div className="GeneralImage">
                        <span
                            ref="enlarge"
                            onMouseDown={() => this.onMouseDowns("enlarge")}
                            onMouseUp={() => this.onMouseUps("enlarge")}
                        > <img src={enlarge}
                               style={{display: this.state.enlarge ? "none" : "block"}}
                               className="enlarge"/>
                            <img src={enlarge1}
                                 style={{display: this.state.enlarge ? "block" : "none"}}
                                 className="enlarge"/>
                        </span>
                        <span
                            ref="handed"
                            onMouseDown={() => this.onMouseDowns("handed")}
                            onMouseUp={() => this.onMouseUps("handed")}
                        ><img src={handed} style={{display: this.state.handed ? "none" : "block"}} className="enlarge"/>
                                             <img src={handed1} style={{display: this.state.handed ? "block" : "none"}}
                                                  className="enlarge"/>
                                            </span>
                        <span
                            ref="zoom"
                            onMouseDown={() => this.onMouseDowns("zoom")}
                            onMouseUp={() => this.onMouseUps("zoom")}
                        ><img src={zoom} style={{display: this.state.zoom ? "none" : "block"}} className="enlarge"/>
                                            <img src={zoom1}
                                                 style={{height: "48px", display: this.state.zoom ? "block" : "none"}}
                                                 className="enlarge"/>
                                            </span>
                        <span
                            ref="amplification"
                            onMouseDown={() => this.onMouseDowns("amplification")}
                            onMouseUp={() => this.onMouseUps("amplification")}
                        ><img src={amplification} style={{display: this.state.amplification ? "none" : "block"}}
                              className="enlarge"/>
                                            <img src={amplification1}
                                                 style={{display: this.state.amplification ? "block" : "none"}}
                                                 className="enlarge"/>
                                            </span>
                        <span className="FontImage">放大</span>
                        <span className="FontImage">左旋转</span>
                        <span className="FontImage">拉近</span>
                        <span className="FontImage">光圈</span>
                        <span
                            ref="narrow"
                            onMouseDown={() => this.onMouseDowns("narrow")}
                            onMouseUp={() => this.onMouseUps("narrow")}
                        > <img src={narrow} style={{display: this.state.narrow ? "none" : "block"}}
                               className="enlarge"/>
                                            <img src={narrow1} style={{display: this.state.narrow ? "block" : "none"}}
                                                 className="enlarge"/>
                                            </span>
                        <span
                            ref="rotation"
                            onMouseDown={() => this.onMouseDowns("rotation")}
                            onMouseUp={() => this.onMouseUps("rotation")}
                        ><img src={rotation} style={{display: this.state.rotation ? "none" : "block"}}
                              className="enlarge"/>
                                            <img src={rotation1}
                                                 style={{display: this.state.rotation ? "block" : "none"}}
                                                 className="enlarge"/>
                                            </span>
                        <span
                            ref="Backs"
                            onMouseDown={() => this.onMouseDowns("Backs")}
                            onMouseUp={() => this.onMouseUps("Backs")}
                        ><img src={Backs} style={{display: this.state.Backs ? "none" : "block"}} className="enlarge"/>
                                            <img src={Backs1} style={{display: this.state.Backs ? "block" : "none"}}
                                                 className="enlarge"/>
                                            </span>
                        <span
                            ref="reduction"
                            onMouseDown={() => this.onMouseDowns("reduction")}
                            onMouseUp={() => this.onMouseUps("reduction")}
                        ><img src={reduction} style={{display: this.state.reduction ? "none" : "block"}}
                              className="enlarge"/>
                                            <img src={reduction1}
                                                 style={{display: this.state.reduction ? "block" : "none"}}
                                                 className="enlarge"/>
                                            </span>
                        <span className="FontImage">缩小</span>
                        <span className="FontImage">右旋转</span>
                        <span className="FontImage">后退</span>
                        <span className="FontImage">光圈</span>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = (state, ownProps) => {
    const {sourceNumber} = state
    return {
        sourceNumber: sourceNumber
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({numberSource}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleControl);