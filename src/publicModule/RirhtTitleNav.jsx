import React, {Component, PropTypes} from 'react';
import someMethod from "../containers/home/method";
import {Icon} from "antd"; // 引入了React和PropTypes
import '../publicModule/RightTitltNav.css'

class RirhtTitleNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeNav: true,// index列表导航一级标签控制
            changeNavChild: true// index列表导航二级标签控制
        };
    }

    /**
     * 一级菜单点击
     * */
    navChange = () => {
        this.setState({
            changeNav: false
        })
    };
    /**
     * 一级菜单点击 抬起
     * */
    navChangeUp = () => {
        if (this.state.changeNav == "false") {
            console.log("10086")
        }
        this.setState({
            changeNav: true,
            changeNavChild: true
        })
    };
    /**
     * 2级菜单点击
     * */
    changeNavChild = () => {
        this.setState({
            changeNavChild: false
        })
    };
    /**
     * 2级菜单点击 抬起
     * */
    changeNavChildUp = () => {
        this.setState({
            changeNavChild: true
        })
    }

    render() {
        return (
            <div className="left-min">
                <div>
                    <h3 className="Exception">{this.props.title}</h3>
                </div>
                <div className="box-index-min">
                    {/*主标题 单击显示下拉内容*/}
                    <div
                        onClick={this.navChange}
                        style={{display: this.state.changeNav ? "block" : "none"}}
                    >
                        <div className='box-index-min-tit'>
                            <span>220KV青海变隧道</span>
                            <Icon type="down"/>
                        </div>
                    </div>
                    {/*主标题 单击收回内容*/}
                    <div
                        onClick={this.navChangeUp}
                        style={{display: this.state.changeNav ? "none" : "block"}}
                    >
                        <div className='box-index-min-tit'>
                            <span>220KV青海变隧道</span>
                            <Icon type="up"/>
                        </div>
                    </div>
                    {/*二级标题*/}
                    <div style={{display: this.state.changeNav ? "none" : "block"}}>
                        <div
                            onClick={this.changeNavChild}
                            style={{display: this.state.changeNavChild ? "block" : "none"}}
                        >
                            <div className='box-index-min-childTit'>
                                <span className="box-index-tit-min">#1主变(3点位)</span>
                                <Icon type="down"/>
                            </div>
                        </div>
                        <div
                            onClick={this.changeNavChildUp}
                            style={{display: this.state.changeNavChild ? "none" : "block"}}
                        >
                            <div className='box-index-min-childTit'>
                                <span className="box-index-tit-min">#1主变(3点位)</span>
                                <Icon type="up"/>
                            </div>
                        </div>

                        {/*三级内容*/}
                        <div className='box-index-min-about'
                             style={{display: this.state.changeNavChild ? "none" : "block"}}>
                            <ul style={{display: this.state.changeNavChild ? "none" : "block"}}>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                            </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>

                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                                <li className='box-index-min-tit-about'>
                                    <span>#1主变油位监测</span><span style={{color: "#10a3e7"}}>查看</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default RirhtTitleNav