import React, { Component, PropTypes } from 'react';
import { is, fromJS } from 'immutable';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router';
import styles from './style/bcrumb.less';

/**
 * 公共面包屑
 *
 * @export
 * @class Bcrumb
 * @extends {Component}
 */
export class Bcrumb extends Component {
	constructor(props) {
		super(props); //后才能用this获取实例化对象
        console.log(this.props,'this.props')
	}
	render() {
		return (
			<Breadcrumb className="bread-crumb" style={{marginLeft:"20px",fontSize:"15px",color:"#eee"}}>
                <Breadcrumb.Item style={{color:"#eee"}}>
                    <Link to="/home"><Icon type="home"style={{color:"#eee"}} /><span style={{color:"#eee"}}>主页</span></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item style={{color:"#eee"}}>
                    <Icon type={this.props.icon ? this.props.icon : 'laptop'} /><span style={{color:"#eee"}}>{ this.props.title }</span>
                </Breadcrumb.Item>
            </Breadcrumb> 
		)
	}
}